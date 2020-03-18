if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

// create a dotter

const dotter = new Dotter({
    jitter: 0.8,
    density: 0.215,
});

// scale is broken in firefox/safari, disabling for now
dotter.addFilter(Bitter.scale);
// dotter.addFilter(Bitter.threshold);

// create a particle view

const view = new ParticleView({
    size: {
        max: 28,
        min: 18,
    },
    count: 15000,
    color: {
        top: '#3153A9',
        bottom: '#FB9034',
        background: '#000000',
        opacity: 0.9,
    },
    fidget: {
        speed: 2.4,
        distance: 0.8,
    },
    tween: {
        duration: 300, // fps
        xfunc: Tween.easeInOutCubic,
        yfunc: Tween.easeInOutCubic,
        ofunc: Tween.easeInOutCubic,
    },
    canvas: {
        width: 600,
        height: 200,
        domElement: document.querySelector('#fireflies-canvas'),
    },
    sprite: 'pixel.png',
    // flee: {
    //     distance: 5,
    //     proximity: 40,
    //     reflex: 0.03,
    // },
});

// rotate through these pictures

const masks = [
    'masks/clayto.png',
];

// wire up ui to particleview

// process first mask
// rotate through subsequent masks on a timer
let i = 0;
let tid = 0;
const next = () => {
    dotter.process(masks[i]).then(view.shape.bind(view));
    i += 1;
    i %= masks.length;
    if (tid) {
        clearTimeout(tid);
        console.log(`[main] cleared pending mask (tid: ${tid})`);
    }
    tid = setTimeout(next, 8000);
}
next();
view.renderer.domElement.addEventListener('click', next);
