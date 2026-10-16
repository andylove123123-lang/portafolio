(()=>{'use strict';
 const video=document.querySelector('.fusion-art'),button=document.querySelector('.fusion-playback'),card=document.querySelector('.profile-card');
 if(!video||!button)return;
 const motion=matchMedia('(prefers-reduced-motion: reduce)'),compact=matchMedia('(max-width:1259px)');let userPaused=false,failed=false;
 function label(){if(failed){button.textContent='Fondo estatico';button.disabled=true;return;}button.textContent=motion.matches?'Fondo estático':userPaused?'Reanudar fondo':'Pausar fondo';button.disabled=motion.matches;button.setAttribute('aria-pressed',String(userPaused||motion.matches));}
 function sync(){label();if(failed||motion.matches||document.hidden||userPaused){video.pause();return;}video.play()?.catch(()=>{button.textContent='Reproducir fondo';userPaused=true;label();});}
 function toggle(){userPaused=!userPaused;sync();}
 function layout(){if(card)card.open=!compact.matches;}
 button.addEventListener('click',toggle);document.addEventListener('visibilitychange',sync);motion.addEventListener('change',sync);compact.addEventListener('change',layout);
 video.addEventListener('error',()=>{failed=true;button.textContent='Fondo estático';button.disabled=true;document.documentElement.classList.add('fusion-video-fallback');});
 document.querySelector('#copy-email')?.addEventListener('click',async()=>{const status=document.querySelector('#copy-feedback');try{await navigator.clipboard.writeText('franklinandreslemaguevara@gmail.com');status.textContent='Correo copiado.';}catch{status.textContent='Selecciona y copia: franklinandreslemaguevara@gmail.com';}});
 if(['127.0.0.1','localhost'].includes(location.hostname)||location.protocol==='file:')document.querySelectorAll('[data-owner-tools]').forEach(el=>el.hidden=false);
 layout();sync();
})();
