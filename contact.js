(()=>{'use strict';
 const form=document.querySelector('[data-contact-form]');if(!form)return;
 const button=form.querySelector('[type=submit]'),status=form.querySelector('.contact-status');let busy=false;
 const say=(message,state)=>{status.textContent=message;status.dataset.status=state;};
 form.addEventListener('submit',async event=>{event.preventDefault();if(busy||!form.reportValidity())return;if(form.elements._honey.value)return;
  const payload=Object.fromEntries(new FormData(form));payload._replyto=payload.email;payload._subject='Portafolio: '+payload.subject;
  busy=true;button.disabled=true;form.setAttribute('aria-busy','true');button.textContent='Enviando…';say('Enviando tu mensaje…','pending');
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
  try{const response=await fetch(form.dataset.endpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload),signal:controller.signal});const result=await response.json();
   if(/activat|confirm.*email|verify.*email/i.test(result.message||'')){say('Falta confirmar el correo de destino. Franklin debe revisar el mensaje de activación de FormSubmit. Mientras tanto, puedes copiar el correo de arriba.','error');return;}
   if(response.status===429){say('El servicio ha recibido demasiados intentos. Espera unos minutos antes de reintentar. Tu mensaje sigue aquí.','error');return;}
   if(!response.ok||!(result.success===true||result.success==='true'))throw Error('rejected');
   say('El servicio recibió tu mensaje. Gracias por escribirme; te responderé a tu correo.','success');
   // Keep the draft available; an acknowledgement does not prove email delivery.
  }catch(error){say(error.name==='AbortError'?'El envío tardó demasiado y no pudimos confirmarlo. Tu mensaje sigue aquí; puedes reintentar o copiar el correo.':'No pudimos confirmar el envío. Tu mensaje sigue aquí; revisa tu conexión, reintenta o copia el correo.','error');}
  finally{clearTimeout(timeout);busy=false;button.disabled=false;button.innerHTML='Enviar mensaje <span aria-hidden="true">↗</span>';form.removeAttribute('aria-busy');}
 });
})();
