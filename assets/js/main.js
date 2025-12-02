/*=============== HOME SPLIT TEXT ===============*/
const {animate, text, stagger} = anime
const {chars: chars1} = text.split('.home__profession-1',{chars:true})
const {chars: chars2} = text.split('.home__profession-2',{chars:true})

animate(chars1,{
    y:[
        {to:['1001','0%']},
        {to:'-100%', delay:4000, ease:'in(3)'}
    ],
    duration:900,
    ease:'out(3)',
    delay:stagger(80),
    loop:true,
})
animate(chars2,{
    y:[
        {to:['1001','0%']},
        {to:'-100%', delay:4000, ease:'in(3)'}
    ],
    duration:900,
    ease:'out(3)',
    delay:stagger(80),
    loop:true,
})

/*=============== WORK TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]');

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const targetSelector = tab.dataset.target,
              targetContent = document.querySelector(targetSelector);

        tabContents.forEach((content) => content.classList.remove('work-active'));
        tabs.forEach((t) => t.classList.remove('work-active'));

        tab.classList.add('work-active');
        targetContent.classList.add('work-active');
    });
});

/*=============== CUSTOM CURSOR ===============*/
const cursor=document.querySelector('.cursor')
let mouseX=0, mouseY=0
const cursorMove=()=>{
    cursor.style.left=`${mouseX}px`
    cursor.style.top=`${mouseY}px`
    cursor.style.transform= 'translate(-50%, -50%)'
    requestAnimationFrame(cursorMove)
}
document.addEventListener('mousemove',(e)=>{
    mouseX=e.clientX
    mouseY=e.clientY
}
)
cursorMove();

/* Hide custom cursor on links */
const a=document.querySelectorAll('a')
a.forEach(item => {
    item.addEventListener('mouseover',()=>{
        cursor.classList.add('hide-cursor')
})
 item.addEventListener('mouseleave',()=>{
        cursor.classList.remove('hide-cursor')
})
})
const btn=document.querySelectorAll('button')
btn.forEach(item => {
    item.addEventListener('mouseover',()=>{
        cursor.classList.add('hide-cursor')
})
 item.addEventListener('mouseleave',()=>{
        cursor.classList.remove('hide-cursor')
})
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr=ScrollReveal({
    origin:'top',
    distance:'60px',
    duration:2000,
    delay:300,
})
sr.reveal(`.home__image, .projects__container, .work__container`)
sr.reveal(`.home__data`,{delay:900,origin:'bottom'})
sr.reveal(`.home__info`,{delay:1200,origin:'bottom'})
sr.reveal(`.home__social, .home__cv`,{delay:1500})
sr.reveal(`.about__data`,{origin:'left'})
sr.reveal(`.about__image`,{origin:'right'})
sr.reveal(`.services`,{origin:'right'})
sr.reveal(`.skills__card`,{delay:900,origin:'top'})




const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const InputValue = {
        name: document.getElementById('Name').value,
        email: document.getElementById('Email').value,
        message: document.getElementById('Message').value
    };

    emailjs.send('service_lryij8p', 'template_qw6vkiv', InputValue)
        .then(function(response) {
           alert('Message envoyé avec succès !');
           form.reset(); 
        }, function(error) {
           alert('Erreur, le message n a pas pu être envoyé.');
        });
});



document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery__item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    if (!lightbox || !lightboxImg || !lightboxClose || !lightboxPrev || !lightboxNext) {
        console.error('Gallery elements not found!');
        return;
    }

    let currentIndex = 0;
    const images = [];

    galleryItems.forEach((item, index) => {
        const img = item.querySelector('.gallery__img');
        if (img) {
            images.push(img.src);
            
            item.addEventListener('click', function(e) {
                e.preventDefault();
                currentIndex = index;
                openLightbox();
            });
        }
    });

    function openLightbox() {
        if (images[currentIndex]) {
            lightbox.classList.add('active');
            lightboxImg.src = images[currentIndex];
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        if (images[currentIndex]) {
            lightboxImg.src = images[currentIndex];
        }
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        if (images[currentIndex]) {
            lightboxImg.src = images[currentIndex];
        }
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeLightbox();
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            showPrevImage();
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', function(e) {
            e.stopPropagation();
            showNextImage();
        });
    }

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape' || e.key === 'Esc') {
            closeLightbox();
        }
        if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
        if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });

    console.log('Gallery initialized with ' + images.length + ' images');
});