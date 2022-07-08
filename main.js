(()=>{"use strict";function e(e){"Escape"===e.key&&r(document.querySelector(".popup_active"))}function t(t){document.addEventListener("keydown",e),t.classList.add("popup_active")}function r(t){document.removeEventListener("keydown",e),t.classList.remove("popup_active")}document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_active")&&r(e),t.target.classList.contains("popup__close-button")&&r(e)}))}));var n,o,c,a,i,u,s,l,d,f,_,m,v,p,h,y,S,b,q,k,L,g,E,C,j={baseUrl:"https://nomoreparties.co/v1/plus-cohort-12",headers:{authorization:"5743d2b2-8d60-4e50-9a9c-7a3ab60b2c12","Content-Type":"application/json"}},x=function(){return fetch("".concat(j.baseUrl,"/users/me"),{headers:j.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))},A=document.querySelector(".cards"),P=document.querySelector("#new-place").content,U=document.querySelector(".popup-image"),w=U.querySelector(".popup-image__name"),T=U.querySelector(".popup-image__link"),B="912df452cc2f9c1b7c925e7c",D=function(e){var t=P.cloneNode(!0);return t.querySelector(".card__name").textContent=e.name,t.querySelector(".card__link").src=e.link,t.querySelector(".card__link").alt="Изображение "+e.name,t.querySelector(".card__like").textContent=e.like.length,t.querySelector(".card__link").addEventListener("click",O),t.querySelector(".card__heart").addEventListener("click",(function(t){I(t,e.id)})),t.querySelector(".card__trash").addEventListener("click",(function(t){J(t,e.id)})),e.ownerId!==B&&t.querySelector(".card__trash").remove(),e.like.some((function(e){return e._id===B}))?t.querySelector(".card__heart").classList.add("card__heart_active"):t.querySelector(".card__heart").classList.remove("card__heart_active"),t},N=function(e){A.prepend(e)},O=function(e){w.textContent=e.target.alt,T.src=e.target.src,T.alt=e.target.alt,t(U)},I=function(e,t){var r;!function(e){return e.target.classList.contains("card__heart_active")}(e)?(e.target.classList.add("card__heart_active"),function(e){return fetch("".concat(j.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:j.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))}(t).then((function(t){e.target.closest(".card").querySelector(".card__like").textContent=t.likes.length}))):(e.target.classList.remove("card__heart_active"),(r=t,fetch("".concat(j.baseUrl,"/cards/likes/").concat(r),{method:"DELETE",headers:j.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))).then((function(t){e.target.closest(".card").querySelector(".card__like").textContent=t.likes.length})))},J=function(e,t){var r;e.target.closest(".card").remove(),r=t,fetch("".concat(j.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:j.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))},H="",R=function(e){var t=Array.from(e.querySelectorAll(".form__input")),r=e.querySelector(".form__submit-button");e.reset(),t.forEach((function(t){var r=e.querySelector(".".concat(t.id,"-error"));r.classList.contains("form__input-error_active")&&(t.classList.remove("form__input_type_error"),r.classList.remove("form__input-error_active"))})),r.classList.contains("form__submit-button_inactive")||(r.classList.add("form__submit-button_inactive"),r.setAttribute("disabled",""))},z=function(e,t){var r=e.querySelector(".form__submit-button");t?(H=r.textContent,r.textContent="Сохранение..."):r.textContent=H};n=document.querySelector(".profile__edit-button"),o=document.querySelector(".popup-profile"),c=o.querySelector(".form-profile"),a=c.querySelector(".form-profile__name"),i=c.querySelector(".form-profile__job"),u=document.querySelector(".profile__avatar"),s=document.querySelector(".profile__title"),l=document.querySelector(".profile__subtitle"),c.addEventListener("submit",(function(e){var t,n;e.preventDefault(),z(c,!0),s.textContent=a.value,l.textContent=i.value,(t=a.value,n=i.value,fetch("".concat(j.baseUrl,"/users/me"),{method:"PATCH",headers:j.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))).finally((function(){z(c,!1)})),r(o)})),x().then((function(e){s.textContent=e.name,l.textContent=e.about,u.src=e.avatar})),n.addEventListener("click",(function(){R(c),x().then((function(e){a.value=e.name,i.value=e.about})),t(o)})),d=document.querySelector(".profile__add-button"),f=document.querySelector(".popup-card"),_=f.querySelector(".form-card"),m=_.querySelector(".form-card__name"),v=_.querySelector(".form-card__link"),p={},_.addEventListener("submit",(function(e){var t,n;e.preventDefault(),z(_,!0),(t=m.value,n=v.value,fetch("".concat(j.baseUrl,"/cards"),{method:"POST",headers:j.headers,body:JSON.stringify({name:t,link:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))).then((function(e){p.name=e.name,p.link=e.link,p.ownerId=e.owner._id,p.like=e.likes,p.id=e._id})).then((function(){return N(D(p))})).finally((function(){z(_,!1)})),r(f)})),d.addEventListener("click",(function(e){R(_),t(f)})),fetch("".concat(j.baseUrl,"/cards"),{headers:j.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})).then((function(e){e.map((function(e){return{name:e.name,link:e.link,like:e.likes,id:e._id,ownerId:e.owner._id}})).map((function(e){return D(e)})).reverse().forEach((function(e){N(e)}))})),function(){var e=document.querySelector(".profile__avatar"),n=document.querySelector(".popup-avatar"),o=document.querySelector(".form-avatar"),c=document.querySelector(".profile__avatar"),a=o.querySelector(".form-avatar__link");o.addEventListener("submit",(function(e){var t;e.preventDefault(),z(o,!0),(t=a.value,fetch("".concat(j.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:j.headers,body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))).then((function(e){c.src=e.avatar})).finally((function(){z(o,!1)})),r(n)})),e.addEventListener("click",(function(){R(o),t(n)}))}(),y=(h={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__submit-button",inactiveButtonClass:"form__submit-button_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"}).formSelector,S=h.inputSelector,b=h.submitButtonSelector,q=h.inactiveButtonClass,k=h.inputErrorClass,L=h.errorClass,g=Array.from(document.querySelectorAll(y)),E=function(e,t){t.validity.valid?function(e,t){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(k),r.textContent="",r.classList.remove(L)}(e,t):function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error")),o=e.getBoundingClientRect(),c=t.getBoundingClientRect(),a=c.x-o.x,i=c.y-o.y+c.height;n.style.left=a+"px",n.style.top=i+"px",t.classList.add(k),n.textContent=r,n.classList.add(L)}(e,t,t.validationMessage)},C=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.removeAttribute("disabled"),t.classList.remove(q)):(t.setAttribute("disabled",""),t.classList.add(q))},g.forEach((function(e){!function(e){var t=Array.from(e.querySelectorAll(S)),r=e.querySelector(b);C(t,r),t.forEach((function(n){n.addEventListener("input",(function(){E(e,n),C(t,r)}))}))}(e)}))})();