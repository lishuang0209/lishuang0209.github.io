const projects = [
  {title:'Mori · 一杯茶的日常',description:'以一杯抹茶为起点，探索自然、留白与温暖的品牌表达。用柔和的绿色、纸张肌理与简洁字体，构想一种慢下来的日常体验。',tags:['品牌视觉','包装设计','自然与留白']},
  {title:'Flow · 让日子有一点秩序',description:'一个轻量计划工具的界面概念。把今天的计划、专注与小小的进步放在一起，让每一天的安排更清晰，也更从容。当前展示为产品视觉概念。',tags:['产品概念','界面设计','专注与计划']},
  {title:'日常观察室',description:'把散步时看到的颜色、光影和细节整理成一本视觉手记。用编辑设计的方式保存普通日子的片段，探索生活记录的更多可能。',tags:['视觉记录','编辑设计','个人创作']}
];
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});
  document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;});
}));
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
  const project=projects[Number(button.dataset.project)];
  document.getElementById('detail-title').textContent=project.title;
  document.getElementById('detail-description').textContent=project.description;
  document.getElementById('detail-tags').replaceChildren(...project.tags.map(tag=>{const span=document.createElement('span');span.textContent=tag;return span;}));
  document.getElementById('detail').showModal();
}));
document.getElementById('hello').addEventListener('click',()=>document.getElementById('contact-dialog').showModal());
document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
});
document.getElementById('year').textContent=new Date().getFullYear();
