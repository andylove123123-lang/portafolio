(()=>{'use strict';
 const form=document.querySelector('[data-contact-form]');if(!form)return;
 const button=form.querySelector('[type=submit]'),status=form.querySelector('.contact-status');let busy=false;
 const say=(message,state)=>{status.textContent=message;status.dataset.status=state;};
 form.addEventListener('submit',async event=>{event.preventDefault();if(busy||!form.reportValidity())return;if(form.elements._honey.value)return;
  const payload=Object.fromEntries(new FormData(form));payload._replyto=payload.email;payload._subject='Portafolio: '+payload.subject;
  busy=true;button.disabled=true;form.setAttribute('aria-busy','true');button.textContent='Enviando…';say('Enviando tu mensaje…','pending');
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
  try{const response=await fetch(form.dataset.endpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload),signal:controller.signal});const result=await response.json();if(!response.ok||!(result.success===true||result.success==='true'))throw Error('rejected');
   if(/activat|confirm.*email/i.test(result.message||'')){say('El formulario todavía necesita activación. Puedes contactarme copiando el correo de arriba.','error');return;}
   say('El servicio recibió tu mensaje. Gracias por escribirme; te responderé a tu correo.','success');
   // Keep the draft available; an acknowledgement does not prove email delivery.
  }catch(error){say(error.name==='AbortError'?'El envío tardó demasiado y no pudimos confirmarlo. Tu mensaje sigue aquí; puedes reintentar o copiar el correo.':'No pudimos confirmar el envío. Tu mensaje sigue aquí; revisa tu conexión, reintenta o copia el correo.','error');}
  finally{clearTimeout(timeout);busy=false;button.disabled=false;button.innerHTML='Enviar mensaje <span aria-hidden="true">↗</span>';form.removeAttribute('aria-busy');}
 });
})();
