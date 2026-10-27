(() => {
  'use strict';
  const config = window.EVALUATION_CONFIG;
  const content = window.EVALUATION_CONTENT;
  content.fr.yearsWord = 'ans'; content.en.yearsWord = 'years';
  const consentKey = 'ef-evaluation-consent-v1';
  const successKey = 'ef-evaluation-submission-v1';
  const areas = [['Gatineau','gatineau'],['Aylmer','aylmer'],['Hull','hull'],['Buckingham','buckingham'],['Masson-Angers','masson-angers'],['Cantley','cantley'],['Chelsea','chelsea'],['Val-des-Monts','val-des-monts']];
  const footerAreas = ['Gatineau','Hull','Aylmer','Masson-Angers','Buckingham','Cantley','Chelsea','Val-des-Monts'];
  const isThanks = document.body.classList.contains('thanks-page');
  let language = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'fr';
  let formStep = 1, submitting = false, errorKey = '';
  let metaLoaded = false, googleLoaded = false, advertisingAccepted = false;
  const debug = window.EVALUATION_DEBUG = { events: [], preview: config.preview, formStep: 1 };
  const t = key => content[language][key] ?? key;
  const escape = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  const icon = name => `<svg aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key,value) { try { localStorage.setItem(key,value); } catch { /* The current page choice still works. */ } }
  };
  function localizedUrl(path, next = language) {
    const url = new URL(path, location.href);
    if (next === 'en') url.searchParams.set('lang','en'); else url.searchParams.delete('lang');
    return `${url.pathname}${url.search}${url.hash}`;
  }
  function mainHref(href) { return language === 'en' ? href.replace('www.eric-fortier.com/fr','www.eric-fortier.com/en') : href; }
  function closeNavigation() {
    document.querySelector('.nav-menu')?.classList.remove('is-mobile-open');
    const mobile = document.getElementById('menu-toggle');
    if (mobile) { mobile.setAttribute('aria-expanded','false'); mobile.setAttribute('aria-label',t('navOpen')); }
    document.querySelectorAll('.nav-trigger').forEach(trigger => trigger.setAttribute('aria-expanded','false'));
    document.querySelectorAll('.nav-dropdown').forEach(list => { list.hidden = true; });
  }
  function renderNavigation() {
    const container = document.getElementById('navigation-groups');
    if (!container) return;
    container.innerHTML = window.EVALUATION_NAVIGATION.map(group => `<li class="nav-group"><button type="button" class="nav-trigger" id="nav-${group.id}" aria-expanded="false" aria-controls="links-${group.id}"><span>${escape(language === 'en' ? group.en : group.label)}</span>${icon('chevron')}</button><ul class="nav-dropdown" id="links-${group.id}" aria-labelledby="nav-${group.id}" hidden>${group.links.map(link => {
      const href = link.href === '#public-profile-contact-info' ? '#site-footer' : link.href === 'https://evaluation.eric-fortier.com/' ? (isThanks ? localizedUrl('./index.html#evaluation') : '#evaluation') : mainHref(link.href);
      return `<li><a href="${escape(href)}">${escape(language === 'en' ? link.en : link.label)}</a></li>`;
    }).join('')}</ul></li>`).join('');
    container.querySelectorAll('.nav-trigger').forEach(trigger => {
      const open = focusLast => {
        closeNavigation();
        if (matchMedia('(max-width:960px)').matches) {
          document.querySelector('.nav-menu').classList.add('is-mobile-open');
          document.getElementById('menu-toggle').setAttribute('aria-expanded','true');
          document.getElementById('menu-toggle').setAttribute('aria-label',t('navClose'));
        }
        trigger.setAttribute('aria-expanded','true');
        const list = document.getElementById(trigger.getAttribute('aria-controls')); list.hidden = false;
        if (focusLast !== undefined) { const links = list.querySelectorAll('a'); links[focusLast ? links.length - 1 : 0]?.focus(); }
      };
      trigger.addEventListener('click',() => {
        if (trigger.getAttribute('aria-expanded') === 'true') { trigger.setAttribute('aria-expanded','false'); document.getElementById(trigger.getAttribute('aria-controls')).hidden = true; }
        else open();
      });
      trigger.addEventListener('keydown',event => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); open(event.key === 'ArrowUp'); }
      });
    });
    container.querySelectorAll('.nav-dropdown').forEach(list => {
      const links = Array.from(list.querySelectorAll('a'));
      links.forEach((link,index) => {
        link.addEventListener('click',closeNavigation);
        link.addEventListener('keydown',event => {
          const offsets = {ArrowDown:1,ArrowUp:-1};
          if (event.key in offsets || event.key === 'Home' || event.key === 'End') {
            event.preventDefault();
            links[event.key === 'Home' ? 0 : event.key === 'End' ? links.length-1 : (index+offsets[event.key]+links.length)%links.length].focus();
          }
        });
      });
    });
  }
  function renderFooter() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;
    const contactHref = isThanks ? localizedUrl('./index.html#evaluation') : '#evaluation';
    const sectorLinks = footerAreas.map(name => { const slug=areas.find(area=>area[0]===name)[1]; return `<li><a href="https://www.eric-fortier.com/${language}/secteur-${slug}">${escape(name)}</a></li>`; }).join('');
    footer.innerHTML = `<div class="footer-inner"><img class="footer-avatar" src="./assets/eric-fortier-avatar.png" alt="Eric Fortier" width="120" height="120" loading="lazy"><div class="footer-columns"><div class="footer-identity"><h2>Eric Fortier</h2><p class="footer-role">${escape(t('brokerRole'))}</p><p>Remax Direct – Gatineau, QC</p><div class="footer-contact-details"><a href="mailto:eric.fortier@remax-quebec.com">${icon('mail')}<span>eric.fortier@remax-quebec.com</span></a><a class="js-phone" href="tel:+18192103124">${icon('phone')}<span>+1 (819) 210-3124</span></a></div><div class="footer-actions"><a class="button button-blue" href="${contactHref}">${icon('send')}<span>${escape(t('navContact'))}</span></a><a class="button button-outline" href="${config.appointmentUrl}" target="_blank" rel="noopener noreferrer">${icon('calendar')}<span>${escape(t('appointment'))}</span></a></div></div><section><h3>${escape(t('footerContact'))}</h3><a class="footer-link" href="${contactHref}">${icon('message')}<span>${escape(t('navContact'))}</span></a><a class="footer-link" href="${config.appointmentUrl}" target="_blank" rel="noopener noreferrer">${icon('calendar')}<span>${escape(t('appointment'))}</span></a><p>${escape(t('spokenLanguages'))}</p></section><section class="footer-social"><h3>${escape(t('footerLinks'))}</h3><a href="https://www.facebook.com/ericfortier.inc/" target="_blank" rel="noopener noreferrer">Facebook ↗</a><a href="https://www.remax-quebec.com/fr/courtiers-immobiliers/eric.fortier" target="_blank" rel="noopener noreferrer">Remax ↗</a></section></div><address>3 rue Picardie, Gatineau, Québec, J8T 1N8</address></div><div class="footer-legal"><div class="footer-legal-inner"><div class="footer-legal-links"><a class="footer-language" href="${localizedUrl(location.href,language==='fr'?'en':'fr')}" data-language-switch lang="${language==='fr'?'en':'fr'}">${icon('globe')}${language==='fr'?'English':'Français'}</a><span aria-hidden="true">·</span><a href="https://www.welcomespaces.io/${language}/terms-of-use" target="_blank" rel="noopener noreferrer">${escape(t('terms'))}</a><span aria-hidden="true">·</span><a class="privacy-link" href="https://www.eric-fortier.com/${language}/privacy-policy" target="_blank" rel="noopener noreferrer">${escape(t('privacyShort'))}</a><span aria-hidden="true">·</span><span>© ${new Date().getFullYear()} Eric Fortier.</span></div><button class="cookie-settings" type="button" data-cookie-settings>${escape(t('cookieSettings'))}</button></div></div><nav class="footer-sectors" aria-label="${escape(t('areasFooter'))}"><h3>${escape(t('areasFooter'))}</h3><ul>${sectorLinks}</ul></nav>`;
  }
  function renderAreas() {
    const container=document.getElementById('area-links');
    if (container) container.innerHTML=areas.map(([name,slug])=>`<a href="https://www.eric-fortier.com/${language}/secteur-${slug}" target="_blank" rel="noopener noreferrer">${icon('pin')}<span>${escape(name)}</span>${icon('arrow-up')}</a>`).join('');
  }
  function updateMetadata() {
    document.title = isThanks ? `${t('thanksTitle')} | Eric Fortier` : t('title');
    const description=document.querySelector('meta[name="description"]'); if(description) description.content=t('description');
    const pageUrl=isThanks?new URL('merci.html',config.publicUrl).href:config.publicUrl;
    const values = {'og:locale':language==='en'?'en_CA':'fr_CA','og:title':isThanks?t('thanksTitle'):t('title'),'og:description':t('description'),'og:url':`${pageUrl}${language==='en'?'?lang=en':''}`};
    Object.entries(values).forEach(([name,value])=>document.querySelector(`meta[property="${name}"]`)?.setAttribute('content',value));
    const canonical=document.querySelector('link[rel="canonical"]');if(canonical)canonical.href=`${pageUrl}${language==='en'?'?lang=en':''}`;
    const schema=document.getElementById('structured-data');
    if (schema) {
      const data=JSON.parse(schema.textContent);
      const service=data['@graph'].find(item=>item['@type']==='Service');
      if(service){service.name=t('eyebrow');service.inLanguage=language==='en'?'en-CA':'fr-CA';}
      data['@graph']=data['@graph'].filter(item=>item['@type']!=='FAQPage');
      data['@graph'].push({'@type':'FAQPage',mainEntity:Array.from({length:6},(_,index)=>({'@type':'Question',name:t(`q${index+1}`),acceptedAnswer:{'@type':'Answer',text:t(`a${index+1}`)}}))});
      schema.textContent=JSON.stringify(data).replace(/</g,'\\u003c');
    }
  }
  function setLanguage(next, updateUrl = false) {
    language=next==='en'?'en':'fr';
    document.documentElement.lang=language==='en'?'en-CA':'fr-CA';
    document.querySelectorAll('[data-i18n]').forEach(element=>{const value=content[language][element.dataset.i18n];if(value!==undefined)element.textContent=value;});
    document.querySelectorAll('[data-i18n-html]').forEach(element=>{const value=content[language][element.dataset.i18nHtml];if(value!==undefined)element.innerHTML=value;});
    document.querySelectorAll('[data-placeholder-fr]').forEach(element=>{element.placeholder=language==='en'?element.dataset.placeholderEn:element.dataset.placeholderFr;});
    document.querySelectorAll('[data-aria-key]').forEach(element=>element.setAttribute('aria-label',t(element.dataset.ariaKey)));
    document.querySelectorAll('.main-site-link').forEach(element=>{element.href=`https://www.eric-fortier.com/${language}`;});
    document.querySelectorAll('.privacy-link').forEach(element=>{element.href=`https://www.eric-fortier.com/${language}/privacy-policy`;});
    document.querySelectorAll('[data-evaluation-return]').forEach(element=>{element.href=localizedUrl(element.classList.contains('nav-contact')?'./index.html#evaluation':'./index.html');});
    if(updateUrl)history.pushState({},'',localizedUrl(location.href));
    renderNavigation();renderFooter();renderAreas();updateMetadata();
    document.querySelectorAll('[data-language-switch]').forEach(element=>{
      element.href=localizedUrl(location.href,language==='fr'?'en':'fr');
      if(element.classList.contains('language-switch'))element.textContent=language==='fr'?'EN':'FR';
      element.lang=language==='fr'?'en':'fr';element.setAttribute('aria-label',language==='fr'?'View this page in English':'Afficher cette page en français');
    });
    const langInput=document.getElementById('lead_language');if(langInput)langInput.value=language;
    const badge=document.getElementById('preview-badge');if(badge){badge.hidden=!config.preview;badge.title=t('previewNote');}
    document.querySelectorAll('[data-review-rating]').forEach(element=>{element.textContent=Number(config.googleReviewRating || 5).toFixed(1)+'/5';});
    if(Number.isInteger(config.googleReviewCount)&&config.googleReviewCount>0)document.querySelectorAll('[data-i18n="reviewCount"]').forEach(element=>{element.textContent=config.googleReviewCount+(language==='en'?' reviews':' avis');});
    if(errorKey)showError(errorKey);
    if(submitting)document.querySelector('#submitBtn span').textContent=t('sending');
    document.getElementById('cookie-close')?.setAttribute('aria-label',t('cookieClose'));
    document.getElementById('cookie-banner')?.setAttribute('aria-label',t('cookieSettings'));
  }

  // Advertising calls contain event names and a random request reference only.
  // Property address, contact details and field values never enter these calls.
  function enableAdvertising() {
    advertisingAccepted=true;
    if(config.preview){debug.events.push({event:'preview_consent_accepted'});consumeLeadMarker();return;}
    if(!metaLoaded){
      metaLoaded=true;
      if(!window.fbq){const fbq=function(...args){if(fbq.callMethod)fbq.callMethod(...args);else fbq.queue.push(args);};fbq.queue=[];fbq.loaded=true;fbq.version='2.0';window.fbq=fbq;window._fbq=fbq;const script=document.createElement('script');script.async=true;script.src='https://connect.facebook.net/en_US/fbevents.js';document.head.append(script);}
      window.fbq('consent','grant');window.fbq('set','autoConfig',false,config.metaPixelId);window.fbq('init',config.metaPixelId);window.fbq('track','PageView');
    }else window.fbq?.('consent','grant');
    if(!googleLoaded){
      googleLoaded=true;window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
      window.gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});
      window.gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
      window.gtag('js',new Date());window.gtag('config',config.googleAdsId);
      const script=document.createElement('script');script.async=true;script.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.googleAdsId)}`;document.head.append(script);
    }else window.gtag?.('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
    consumeLeadMarker();
  }
  function track(event,details={}) {
    if(!advertisingAccepted)return;
    // These values are fixed application metadata, never form data.
    debug.events.push({event});
    if(config.preview)return;
    if(event==='Lead'){
      window.fbq?.('track','Lead',{content_name:'Evaluation immobiliere',content_category:'real_estate_valuation'},{eventID:details.id});
      window.gtag?.('event','lead_form_submit',{event_category:'lead'});
      if(config.googleLeadSendTo)window.gtag?.('event','conversion',{send_to:config.googleLeadSendTo,transaction_id:details.id});
    }else if(event==='Contact'){
      window.fbq?.('track','Contact',{content_name:'Evaluation immobiliere'});
      window.gtag?.('event','phone_click',{event_category:'lead',event_label:'819-210-3124'});
    }else if(event==='FormStarted')window.gtag?.('event','form_step_1_complete',{event_category:'lead'});
  }
  function consumeLeadMarker() {
    if(!isThanks||!advertisingAccepted)return;
    let marker;
    try{marker=JSON.parse(sessionStorage.getItem(successKey)||'null');}catch{return;}
    if(!marker||marker.consumed||!marker.id||Date.now()-marker.createdAt>1800000)return;
    if(marker.preview&&!config.preview)return;
    marker.consumed=true;
    try{sessionStorage.setItem(successKey,JSON.stringify(marker));}catch{/* No repeat event is triggered in this view. */}
    track('Lead',{id:marker.id});
  }
  function openConsent() {
    const banner=document.getElementById('cookie-banner');if(!banner)return;
    banner.hidden=false;document.body.classList.add('has-cookie-banner');
    const close=document.getElementById('cookie-close');if(close)close.hidden=!storage.get(consentKey);
  }
  function closeConsent() { document.getElementById('cookie-banner').hidden=true;document.body.classList.remove('has-cookie-banner'); }
  function chooseConsent(choice) {
    storage.set(consentKey,choice);
    if(choice==='accepted')enableAdvertising();
    else{advertisingAccepted=false;window.fbq?.('consent','revoke');window.gtag?.('consent','update',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});}
    closeConsent();
  }

  function showError(key) {
    errorKey=key;const alert=document.getElementById('form-alert');if(alert){alert.textContent=t(key);alert.hidden=false;}
  }
  function clearError() {errorKey='';const alert=document.getElementById('form-alert');if(alert){alert.hidden=true;alert.textContent='';}}
  function validateFields(fields) {
    let invalid;
    for(const field of fields){
      field.setCustomValidity('');
      if(field.required&&field.type!=='checkbox'&&!field.value.trim())field.setCustomValidity(t('requiredError'));
      if(field.type==='checkbox'&&field.required&&!field.checked)field.setCustomValidity(t('contactError'));
      if(field.type==='email'&&field.validity.typeMismatch)field.setCustomValidity(t('emailError'));
      if(!field.checkValidity()){field.setAttribute('aria-invalid','true');invalid=invalid||field;}else field.removeAttribute('aria-invalid');
    }
    if(invalid){showError(invalid.type==='checkbox'?'contactError':invalid.type==='email'&&invalid.validity.typeMismatch?'emailError':'requiredError');invalid.focus();return false;}
    clearError();return true;
  }
  function setFormStep(step,{focus=true}={}) {
    formStep=step;debug.formStep=step;
    const property=document.getElementById('property-step'),contact=document.getElementById('contact-step');
    property.hidden=step!==1;contact.hidden=step!==2;contact.disabled=step!==2;
    const first=document.getElementById('progress-property'),second=document.getElementById('progress-contact');
    first.classList.toggle('is-current',step===1);first.classList.toggle('is-complete',step===2);second.classList.toggle('is-current',step===2);
    first.removeAttribute('aria-current');second.removeAttribute('aria-current');(step===1?first:second).setAttribute('aria-current','step');
    clearError();
    if(focus)(step===1?document.getElementById('adresse'):document.getElementById('prenom')).focus({preventScroll:true});
  }
  function initForm() {
    const form=document.getElementById('leadForm');if(!form)return;
    const params=new URLSearchParams(location.search);
    for(const key of ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','gbraid','wbraid','fbclid'])form.elements.namedItem(key).value=(params.get(key)||'').slice(0,250);
    form.elements.namedItem('landing_page').value=location.href;
    form.elements.namedItem('reference_demande').value=crypto.randomUUID?.()||`evaluation-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const goNext=()=>{if(validateFields(Array.from(document.querySelectorAll('#property-step input,#property-step select,#property-step textarea')))){track('FormStarted');setFormStep(2);}};
    document.getElementById('next-step').addEventListener('click',goNext);
    document.getElementById('previous-step').addEventListener('click',()=>setFormStep(1));
    form.addEventListener('input',event=>{event.target.setCustomValidity?.('');event.target.removeAttribute('aria-invalid');});
    form.addEventListener('keydown',event=>{if(event.key==='Enter'&&formStep===1&&event.target.tagName!=='TEXTAREA'){event.preventDefault();goNext();}});
    form.addEventListener('submit',async event=>{
      event.preventDefault();if(submitting)return;if(formStep===1){goNext();return;}
      const fields=Array.from(form.querySelectorAll('input,select,textarea')).filter(field=>field.type!=='hidden'&&field.name!=='_gotcha');
      if(!validateFields(fields))return;
      if(form.elements.namedItem('_gotcha').value)return;
      submitting=true;const button=document.getElementById('submitBtn');button.disabled=true;button.querySelector('span').textContent=t('sending');
      try{
        if(config.preview)await new Promise(resolve=>setTimeout(resolve,300));
        else{
          const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),20000);
          try{
            const response=await fetch(config.formEndpoint,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'},signal:controller.signal});
            if(!response.ok)throw new Error('Submission rejected');
            const result=await response.json();if(result.ok===false||result.errors?.length)throw new Error('Submission rejected');
          }finally{clearTimeout(timeout);}
        }
        const marker={id:form.elements.namedItem('reference_demande').value,createdAt:Date.now(),preview:config.preview,consumed:false};
        try{sessionStorage.setItem(successKey,JSON.stringify(marker));}catch{/* The request remains accepted if storage is blocked. */}
        debug.events.push({event:config.preview?'preview_submission':'submission_accepted'});
        location.assign(localizedUrl('./merci.html'));
      }catch{
        submitting=false;button.disabled=false;button.querySelector('span').textContent=t('submit');showError('error');
      }
    });
    setFormStep(1,{focus:false});
    const cta=document.getElementById('mobile-cta');
    if(cta&&'IntersectionObserver'in window)new IntersectionObserver(entries=>{cta.classList.toggle('is-hidden',entries[0].isIntersecting);},{threshold:0.1}).observe(document.getElementById('evaluation'));
  }

  document.addEventListener('click',event=>{
    const languageLink=event.target.closest('[data-language-switch]');
    if(languageLink&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey&&event.button===0){event.preventDefault();setLanguage(language==='fr'?'en':'fr',true);return;}
    if(event.target.closest('[data-cookie-settings]'))openConsent();
    const choice=event.target.closest('[data-cookie-choice]');if(choice)chooseConsent(choice.dataset.cookieChoice);
    if(event.target.closest('.js-phone'))track('Contact');
    if(!event.target.closest('.site-nav'))closeNavigation();
    const anchor=event.target.closest('a[href="#evaluation"]');
    if(anchor){closeNavigation();setTimeout(()=>document.getElementById(formStep===1?'adresse':'prenom')?.focus({preventScroll:true}),450);}
  });
  document.getElementById('menu-toggle')?.addEventListener('click',()=>{
    const menu=document.querySelector('.nav-menu'),button=document.getElementById('menu-toggle');
    const shouldOpen=!menu.classList.contains('is-mobile-open');closeNavigation();
    if(shouldOpen){menu.classList.add('is-mobile-open');button.setAttribute('aria-expanded','true');button.setAttribute('aria-label',t('navClose'));}
  });
  document.getElementById('site-navigation')?.addEventListener('keydown',event=>{
    if(event.key==='Escape'){
      const trigger=document.querySelector('.nav-trigger[aria-expanded="true"]');
      if(trigger){trigger.setAttribute('aria-expanded','false');document.getElementById(trigger.getAttribute('aria-controls')).hidden=true;trigger.focus();}
      else{closeNavigation();document.getElementById('menu-toggle')?.focus();}
    }
  });
  document.getElementById('site-navigation')?.addEventListener('focusout',event=>{if(event.relatedTarget&&!event.currentTarget.contains(event.relatedTarget))closeNavigation();});
  document.getElementById('cookie-close')?.addEventListener('click',closeConsent);
  window.addEventListener('popstate',()=>setLanguage(new URLSearchParams(location.search).get('lang')==='en'?'en':'fr'));
  setLanguage(language);initForm();
  const choice=storage.get(consentKey);if(choice==='accepted')enableAdvertising();else if(!choice)openConsent();
  if(isThanks){const notice=document.getElementById('thanks-preview-notice');if(notice)notice.hidden=!config.preview;document.querySelectorAll('[data-evaluation-return]').forEach(link=>{link.href=localizedUrl('./index.html');});}
})();
