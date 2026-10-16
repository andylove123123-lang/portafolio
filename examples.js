(() => {
 const $ = s => document.querySelector(s);
 const money = value => '$' + value.toFixed(2);
 if ($('#open-invite')) {
  $('#open-invite').addEventListener('click', () => { $('#invite-content').hidden=false; $('#open-invite').hidden=true; });
  const update = () => { const days=Math.max(0,Math.ceil((new Date('2030-11-15T12:00:00')-new Date())/86400000)); $('#countdown').textContent=`${days} días para el evento ficticio`; };
  update();
  $('#rsvp').addEventListener('submit', e => { e.preventDefault(); $('#rsvp-result').textContent=`Vista previa: ${$('#guest').value.trim()}, confirmo mi asistencia al evento de ejemplo. No se envió ningún mensaje.`; });
 }
 if ($('#products')) {
  const products=[{id:'a',name:'Producto de ejemplo A',price:12.5},{id:'b',name:'Producto de ejemplo B',price:9.99},{id:'c',name:'Producto de ejemplo C',price:7}];
  let cart=[];
  const render=()=>{
   $('#cart').replaceChildren();
   if(!cart.length){const p=document.createElement('p');p.textContent='Tu carrito está vacío.';$('#cart').append(p);}
   cart.forEach(item=>{const product=products.find(p=>p.id===item.id),row=document.createElement('div');row.className='sample-cart-item';const name=document.createElement('span');name.textContent=`${product.name} · ${money(product.price)}`;const input=document.createElement('input');input.type='number';input.min='1';input.max='99';input.value=item.quantity;input.setAttribute('aria-label','Cantidad de '+product.name);input.addEventListener('change',()=>{item.quantity=Math.max(1,Math.min(99,Math.floor(Number(input.value)||1)));render();});const remove=document.createElement('button');remove.type='button';remove.textContent='Quitar';remove.addEventListener('click',()=>{cart=cart.filter(c=>c.id!==item.id);render();});row.append(name,input,remove);$('#cart').append(row);});
   $('#total').textContent=money(cart.reduce((sum,item)=>sum+products.find(p=>p.id===item.id).price*item.quantity,0));$('#checkout').disabled=!cart.length;
  };
  products.forEach(p=>{const card=document.createElement('article');card.className='sample-product';const title=document.createElement('h3');title.textContent=p.name;const price=document.createElement('p');price.textContent=money(p.price);const button=document.createElement('button');button.className='button secondary';button.textContent='Añadir al carrito';button.addEventListener('click',()=>{const item=cart.find(c=>c.id===p.id);if(item)item.quantity=Math.min(99,item.quantity+1);else cart.push({id:p.id,quantity:1});$('#shop-result').textContent='';render();});card.append(title,price,button);$('#products').append(card);});
  $('#checkout').addEventListener('click',()=>{if(!cart.length)return;const total=$('#total').textContent;cart=[];render();$('#shop-result').textContent=`Simulación finalizada por ${total}. No se efectuó un cobro ni se registró una venta.`;});render();
 }
 if ($('#booking')) {
  const today=new Date();const localDate=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');$('#date').min=localDate;
  $('#booking').addEventListener('submit',e=>{e.preventDefault();if($('#date').value<localDate){$('#booking-result').textContent='Elige una fecha actual o futura.';return;}$('#booking-result').textContent=`Vista previa para ${$('#sample-name').value.trim()}: ${$('#service').value}, ${$('#branch').value}, ${$('#date').value} a las ${$('#time').value}. Horario ficticio; la solicitud no fue enviada.`;});
 }
 if ($('#kiosk')) {
  const total=()=>Number($('#base').value)+[...document.querySelectorAll('[name="topping"]:checked')].reduce((s,c)=>s+Number(c.value),0);
  $('#kiosk').addEventListener('change',()=>{$('#kiosk-total').textContent=money(total());$('#kiosk-result').textContent='';});
  $('#kiosk').addEventListener('submit',e=>{e.preventDefault();$('#kiosk-result').textContent=`Vista previa del pedido de ejemplo: ${money(total())}. No se cobró ni se imprimió un comprobante.`;});
 }
})();
