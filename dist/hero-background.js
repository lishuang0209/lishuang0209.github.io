/* Adapted from Skal Ventures Template by joyco:
 * https://v0.app/templates/skal-ventures-template-tnZGzubtsTc
 * Original wave, camera, depth-of-field and sparkle parameters, in standalone WebGL.
 */
(() => {
  const hero = document.querySelector('.hero');
  const canvas = document.getElementById('hero-mesh');
  if (!hero || !canvas) return;
  const gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false });
  if (!gl) return;
  const wave = `float wave(vec3 p,float t){return (
    sin(p.x*2.+t)*cos(p.z*1.5+t)
    +sin(p.x*3.2+t*2.)*cos(p.z*2.1+t)*.6
    +sin(p.x*1.7+t)*cos(p.z*2.8+t*3.)*.4
    +sin(p.x*p.z*.5+t*2.)*.3)*.3;}`;
  const vertex = `precision highp float;
    attribute vec3 aPosition;
    uniform float uTime,uAspect;
    varying float vDistance;
    varying vec3 vPosition,vInitial;
    ${wave}
    void main(){
      float t=uTime*6.28318530718/24.;
      vec3 p=aPosition*.6;
      vec3 pos=aPosition+vec3(wave(p,t),wave(p+vec3(50.,0.,0.),t+2.094),
        wave(p+vec3(0.,50.,0.),t+4.188))*.52;
      vec3 camera=vec3(1.2629783123,2.6646064714,-1.8178993743);
      vec3 forward=normalize(-camera);
      vec3 right=normalize(cross(forward,vec3(0.,1.,0.)));
      vec3 up=cross(right,forward);
      vec3 delta=pos-camera;
      vec3 view=vec3(dot(delta,right),dot(delta,up),-dot(delta,forward));
      gl_Position=vec4(view.x/(.4663076582*uAspect),view.y/.4663076582,
        -1.0000666689*view.z-.0200006667,-view.z);
      vDistance=abs(3.8+view.z);
      gl_PointSize=max(vDistance*1.79*10.,3.);
      vPosition=pos;vInitial=aPosition;
    }`;
  const fragment = `precision highp float;
    uniform float uTime,uReveal;
    uniform vec2 uResolution;
    varying float vDistance;
    varying vec3 vPosition,vInitial;
    ${wave}
    void main(){
      if(length(2.*gl_PointCoord-1.)>.5) discard;
      float hash=fract(sin(dot(vInitial,vec3(127.1,311.7,74.7)))*43758.5453);
      float sparkle=sin(uTime+hash*6.2831853)*.5
        +sin(uTime*1.7+hash*12.5663706)*.3
        +sin(uTime*.8+hash*18.8495559)*.2;
      float hash2=fract(sin(dot(vInitial,vec3(113.5,271.9,97.3)))*37849.3241);
      float mask=sin(hash2*6.2831853)*.7+sin(hash2*12.5663706)*.3;
      if(mask<.3) sparkle*=.05;
      float n=(sparkle+1.)*.5;
      float brightness=.7+mix(n,pow(n,4.),n*n)*1.3;
      float threshold=uReveal*4.+wave(vInitial*4.,0.)*.3;
      float reveal=1.-smoothstep(threshold-.2,threshold+.1,length(vPosition.xz));
      vec2 uv=(gl_FragCoord.xy/uResolution-.5)*2.;
      float vignette=1.-smoothstep(.4,1.9,dot(uv,uv));
      float alpha=(1.04-clamp(vDistance,0.,1.))*smoothstep(-.5,.25,vPosition.y)
        *.8*reveal*uReveal*brightness;
      gl_FragColor=vec4(vec3(vignette),alpha);
    }`;
  let program,buffer,count,uniforms;
  function shader(type,source){
    const item=gl.createShader(type);
    gl.shaderSource(item,source);gl.compileShader(item);
    if(!gl.getShaderParameter(item,gl.COMPILE_STATUS)){
      gl.deleteShader(item);throw new Error('Particle shader compilation failed');
    }
    return item;
  }
  function setup(){
    const shaders=[shader(gl.VERTEX_SHADER,vertex),shader(gl.FRAGMENT_SHADER,fragment)];
    program=gl.createProgram();
    shaders.forEach(item=>gl.attachShader(program,item));gl.linkProgram(program);
    shaders.forEach(item=>gl.deleteShader(item));
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)) throw new Error('Particle program linking failed');
    gl.useProgram(program);
    const positions=[];
    // Preserve the 512-grid spacing; omit points beyond the maximum visible radius.
    for(let z=0;z<512;z++) for(let x=0;x<512;x++){
      const px=(x/511-.5)*20,pz=(z/511-.5)*20;
      if(Math.hypot(px,pz)<5) positions.push(px,0,pz);
    }
    count=positions.length/3;
    buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(positions),gl.STATIC_DRAW);
    const attribute=gl.getAttribLocation(program,'aPosition');
    gl.enableVertexAttribArray(attribute);gl.vertexAttribPointer(attribute,3,gl.FLOAT,false,0,0);
    uniforms=Object.fromEntries(['uTime','uAspect','uReveal','uResolution'].map(name=>[name,gl.getUniformLocation(program,name)]));
    gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.clearColor(0,0,0,0);
  }
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,elapsed=0,lastTime=0,inView=true,lost=false;
  function draw(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uniforms.uTime,motion.matches?4:elapsed);
    gl.uniform1f(uniforms.uReveal,motion.matches?1:1-Math.pow(1-Math.min(elapsed/3.5,1),3));
    gl.uniform1f(uniforms.uAspect,canvas.width/canvas.height);
    gl.uniform2f(uniforms.uResolution,canvas.width,canvas.height);
    gl.drawArrays(gl.POINTS,0,count);
  }
  function resize(){
    if(lost) return;
    const bounds=hero.getBoundingClientRect(),ratio=Math.min(window.devicePixelRatio||1,1.5);
    canvas.width=Math.max(1,Math.round(bounds.width*ratio));
    canvas.height=Math.max(1,Math.round(bounds.height*ratio));
    gl.viewport(0,0,canvas.width,canvas.height);draw();
  }
  function tick(now){
    frame=0;
    if(lost||document.hidden||!inView||motion.matches) return;
    if(!lastTime) lastTime=now;
    const delta=now-lastTime;
    if(delta>=1000/30){elapsed+=Math.min(delta,100)/1000;lastTime=now-delta%(1000/30);draw();}
    frame=requestAnimationFrame(tick);
  }
  function updatePlayback(){
    if(frame) cancelAnimationFrame(frame);
    frame=0;lastTime=0;
    if(lost) return;
    if(motion.matches) draw();
    else if(!document.hidden&&inView) frame=requestAnimationFrame(tick);
  }
  try{setup();resize();}catch(error){
    if(buffer) gl.deleteBuffer(buffer);
    if(program) gl.deleteProgram(program);
    return; // Keep the static fallback visible if WebGL initialization fails.
  }
  canvas.parentElement.classList.add('mesh-ready');
  canvas.addEventListener('webglcontextlost',event=>{
    event.preventDefault();lost=true;canvas.parentElement.classList.remove('mesh-ready');updatePlayback();
  });
  canvas.addEventListener('webglcontextrestored',()=>{
    try{setup();lost=false;resize();}catch(error){lost=true;return;}
    canvas.parentElement.classList.add('mesh-ready');updatePlayback();
  });
  if('ResizeObserver' in window) new ResizeObserver(resize).observe(hero);
  else window.addEventListener('resize',resize,{passive:true});
  if('IntersectionObserver' in window) new IntersectionObserver(entries=>{
    inView=entries[0].isIntersecting;updatePlayback();
  }).observe(hero);
  document.addEventListener('visibilitychange',updatePlayback);
  motion.addEventListener('change',updatePlayback);updatePlayback();
})();
