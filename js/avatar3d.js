// ==========================================
// بناء شخصية Roblox 3D باستخدام Three.js
// إضافة ملامح وشعر وإكسسوارات حقيقية (تاج، كاب، نضارة)
// ==========================================

let torso;
let faceMaterial;
let boyHairGroup, girlHairGroup;

// متغيرات الإكسسوارات
let crownMesh, capMesh, glassesMesh;

function createFaceTexture(isGirl) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#f1c40f';
    ctx.fillRect(0, 0, 128, 128);

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(40, 50, 8, 0, Math.PI * 2); 
    ctx.arc(88, 50, 8, 0, Math.PI * 2); 
    ctx.fill();

    if (isGirl) {
        ctx.fillRect(25, 40, 8, 3);
        ctx.fillRect(95, 40, 8, 3);
    }

    ctx.beginPath();
    ctx.arc(64, 70, 20, 0, Math.PI, false);
    ctx.lineWidth = 5;
    ctx.stroke();

    return new THREE.CanvasTexture(canvas);
}

function init3DAvatar() {
    const container = document.getElementById('avatar-canvas-container');
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 12); 

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true; 
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.minDistance = 5;
    controls.maxDistance = 15;
    controls.maxPolarAngle = Math.PI / 1.5; 

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); 
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const skinMaterial = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.5 });
    const pantsMaterial = new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0.5 });
    let shirtMaterial = new THREE.MeshStandardMaterial({ color: '#3498db', roughness: 0.5 }); 
    
    faceMaterial = new THREE.MeshStandardMaterial({ map: createFaceTexture(false), roughness: 0.5 });
    const headMaterials = [skinMaterial, skinMaterial, skinMaterial, skinMaterial, faceMaterial, skinMaterial];

    const avatarGroup = new THREE.Group();

    // 1. الرأس
    const headGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const head = new THREE.Mesh(headGeo, headMaterials);
    head.position.set(0, 2.5, 0);
    head.castShadow = true;
    avatarGroup.add(head);

    // 2. شعر الولد
    const boyHairMat = new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.9 });
    boyHairGroup = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 1.6), boyHairMat);
    boyHairGroup.position.set(0, 3.35, 0);
    avatarGroup.add(boyHairGroup);

    // 3. شعر البنت
    girlHairGroup = new THREE.Group();
    const girlHairMat = new THREE.MeshStandardMaterial({ color: 0xa04000 });
    const topHair = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.5, 1.8), girlHairMat);
    topHair.position.set(0, 3.4, 0);
    const leftHair = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.2, 1.5), girlHairMat);
    leftHair.position.set(-0.8, 2.7, 0);
    const rightHair = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.2, 1.5), girlHairMat);
    rightHair.position.set(0.8, 2.7, 0);
    girlHairGroup.add(topHair, leftHair, rightHair);
    girlHairGroup.visible = false;
    avatarGroup.add(girlHairGroup);

    // ==========================================
    // "نحت" الإكسسوارات الـ 3D
    // ==========================================

    // تاج الملك (h1)
    const crownGroup = new THREE.Group();
    const crownBase = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.4, 8), new THREE.MeshStandardMaterial({ color: 0xf1c40f, metalness: 0.7 }));
    const crownSpike = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.5, 8), new THREE.MeshStandardMaterial({ color: 0xf1c40f, metalness: 0.7 }));
    crownSpike.position.y = 0.4;
    crownGroup.add(crownBase, crownSpike);
    crownMesh = crownGroup;
    crownMesh.position.set(0, 3.6, 0);
    crownMesh.visible = false;
    avatarGroup.add(crownMesh);

    // كاب أزرق (h2)
    const capGroup = new THREE.Group();
    const capTop = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x3498db }));
    const capVisor = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.1, 0.6), new THREE.MeshStandardMaterial({ color: 0x3498db }));
    capVisor.position.set(0, 0, 0.8);
    capGroup.add(capTop, capVisor);
    capMesh = capGroup;
    capMesh.position.set(0, 3.3, 0);
    capMesh.visible = false;
    avatarGroup.add(capMesh);

    // نضارة شمس (f1)
    const glassGroup = new THREE.Group();
    const lensMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.1, transparent: true, opacity: 0.9 });
    const lensL = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 0.1), lensMat);
    const lensR = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 0.1), lensMat);
    lensL.position.set(-0.4, 0, 0);
    lensR.position.set(0.4, 0, 0);
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.1), lensMat);
    glassGroup.add(lensL, lensR, bridge);
    glassesMesh = glassGroup;
    glassesMesh.position.set(0, 2.6, 0.8); // أمام العين بالظبط
    glassesMesh.visible = false;
    avatarGroup.add(glassesMesh);

    // الجسم والأطراف
    torso = new THREE.Mesh(new THREE.BoxGeometry(2, 2.2, 1), shirtMaterial);
    torso.position.set(0, 0.65, 0);
    torso.castShadow = true;
    avatarGroup.add(torso);

    const armGeo = new THREE.BoxGeometry(0.8, 2.2, 1);
    const leftArm = new THREE.Mesh(armGeo, skinMaterial);
    leftArm.position.set(-1.5, 0.65, 0);
    avatarGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, skinMaterial);
    rightArm.position.set(1.5, 0.65, 0);
    avatarGroup.add(rightArm);

    const legGeo = new THREE.BoxGeometry(0.9, 2, 1);
    const leftLeg = new THREE.Mesh(legGeo, pantsMaterial);
    leftLeg.position.set(-0.5, -1.5, 0);
    avatarGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, pantsMaterial);
    rightLeg.position.set(0.5, -1.5, 0);
    avatarGroup.add(rightLeg);

    scene.add(avatarGroup);

    const platform = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 0.2, 32), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
    platform.position.set(0, -2.6, 0);
    platform.receiveShadow = true;
    scene.add(platform);

    function animate() {
        requestAnimationFrame(animate);
        controls.update(); 
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// دالة تغيير اللون
window.update3DAvatar = function(shirtColorHex) {
    if (typeof torso !== 'undefined' && torso) {
        torso.material.color.set(shirtColorHex);
    }
};

// دالة تحديث الإكسسوارات
window.updateAccessories3D = function(hatId, faceId) {
    if (crownMesh) crownMesh.visible = (hatId === 'h1');
    if (capMesh) capMesh.visible = (hatId === 'h2');
    if (glassesMesh) glassesMesh.visible = (faceId === 'f1');
};

// تبديل النوع
window.switchGender3D = function(gender) {
    const isGirl = (gender === 'girl');
    if (faceMaterial) {
        faceMaterial.map = createFaceTexture(isGirl);
        faceMaterial.map.needsUpdate = true;
    }
    if (boyHairGroup && girlHairGroup) {
        boyHairGroup.visible = !isGirl;
        girlHairGroup.visible = isGirl;
    }
};

window.addEventListener('load', init3DAvatar);