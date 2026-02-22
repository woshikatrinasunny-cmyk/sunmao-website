// 精确的榫卯结构创建函数
// 基于传统木工比例和实际结构

export function createMortiseTenon(scene, structureParts) {
    // 直榫：榫头厚度为木材的1/3，带肩部
    const wood1 = new THREE.MeshStandardMaterial({ color: 0xd4a574, roughness: 0.8, metalness: 0.1 });
    const wood2 = new THREE.MeshStandardMaterial({ color: 0xc19a6b, roughness: 0.8, metalness: 0.1 });
    
    // 榫头部件（带肩部）
    const tenonGroup = new THREE.Group();
    
    // 主体部分
    const tenonBody = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.4, 0.9), wood1);
    tenonBody.position.set(0, 0, 0);
    tenonBody.castShadow = true;
    tenonGroup.add(tenonBody);
    
    // 榫头（厚度为1/3）
    const tenonHead = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.2, 0.3), wood1);
    tenonHead.position.set(0.8, 0, 0);
    tenonHead.castShadow = true;
    tenonGroup.add(tenonHead);
    
    tenonGroup.position.set(-2, 0, 0);
    scene.add(tenonGroup);
    structureParts.push({ mesh: tenonGroup, originalPos: tenonGroup.position.clone() });
    
    // 卯眼部件
    const mortiseGroup = new THREE.Group();
    
    // 主体
    const mortiseBody = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.4, 0.9), wood2);
    mortiseBody.castShadow = true;
    mortiseGroup.add(mortiseBody);
    
    // 卯眼（凹槽）
    const mortiseHole = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.22, 0.32), 
        new THREE.MeshStandardMaterial({ color: 0x8b6f47, roughness: 0.9 }));
    mortiseHole.position.set(-0.39, 0, 0);
    mortiseGroup.add(mortiseHole);
    
    mortiseGroup.position.set(2, 0, 0);
    scene.add(mortiseGroup);
    structureParts.push({ mesh: mortiseGroup, originalPos: mortiseGroup.position.clone() });
}

export function createDovetail(scene, structureParts) {
    // 燕尾榫：梯形pins和tails，角度约10-14度
    const wood1 = new THREE.MeshStandardMaterial({ color: 0xc19a6b, roughness: 0.8, metalness: 0.1 });
    const wood2 = new THREE.MeshStandardMaterial({ color: 0xb8956a, roughness: 0.8, metalness: 0.1 });
    
    const angle = 12 * Math.PI / 180; // 12度角
    const tailWidth = 0.6;
    const pinWidth = 0.3;
    const depth = 0.8;
    const height = 1.5;
    
    // 创建tail（燕尾）形状
    function createTailShape(width, topWidth) {
        const shape = new THREE.Shape();
        const offset = (topWidth - width) / 2;
        shape.moveTo(-width/2, 0);
        shape.lineTo(width/2, 0);
        shape.lineTo(topWidth/2, height);
        shape.lineTo(-topWidth/2, height);
        shape.lineTo(-width/2, 0);
        return shape;
    }
    
    // 左侧板（带tails）
    const leftBoard = new THREE.Group();
    const leftBase = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2, depth), wood1);
    leftBase.position.set(0, 0, 0);
    leftBase.castShadow = true;
    leftBoard.add(leftBase);
    
    // 创建3个tails
    for (let i = 0; i < 3; i++) {
        const tailShape = createTailShape(0.4, 0.6);
        const tailGeom = new THREE.ExtrudeGeometry(tailShape, { depth: depth, bevelEnabled: false });
        const tail = new THREE.Mesh(tailGeom, wood1);
        tail.position.set(0.4, -0.7 + i * 0.7, -depth/2);
        tail.rotation.y = Math.PI / 2;
        tail.castShadow = true;
        leftBoard.add(tail);
    }
    
    leftBoard.position.set(-1.5, 0, 0);
    scene.add(leftBoard);
    structureParts.push({ mesh: leftBoard, originalPos: leftBoard.position.clone() });
    
    // 右侧板（带pins）
    const rightBoard = new THREE.Group();
    const rightBase = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2, depth), wood2);
    rightBase.castShadow = true;
    rightBoard.add(rightBase);
    
    // 创建对应的pins（较窄）
    for (let i = 0; i < 2; i++) {
        const pinShape = createTailShape(0.6, 0.4);
        const pinGeom = new THREE.ExtrudeGeometry(pinShape, { depth: depth, bevelEnabled: false });
        const pin = new THREE.Mesh(pinGeom, wood2);
        pin.position.set(-0.4, -0.35 + i * 0.7, -depth/2);
        pin.rotation.y = -Math.PI / 2;
        pin.castShadow = true;
        rightBoard.add(pin);
    }
    
    rightBoard.position.set(1.5, 0, 0);
    scene.add(rightBoard);
    structureParts.push({ mesh: rightBoard, originalPos: rightBoard.position.clone() });
}

export function createThroughTenon(scene, structureParts) {
    // 透榫：榫头完全穿透，两端可见
    const wood1 = new THREE.MeshStandardMaterial({ color: 0xb8956a, roughness: 0.8, metalness: 0.1 });
    const wood2 = new THREE.MeshStandardMaterial({ color: 0xa67c52, roughness: 0.8, metalness: 0.1 });
    
    // 立柱（带榫头）
    const postGroup = new THREE.Group();
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.8, 3.5, 0.8), wood1);
    post.castShadow = true;
    postGroup.add(post);
    
    // 穿透的榫头（两端露出）
    const tenon = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 2.2), wood1);
    tenon.position.set(0, 0.8, 0);
    tenon.castShadow = true;
    postGroup.add(tenon);
    
    postGroup.position.set(0, 0, 0);
    scene.add(postGroup);
    structureParts.push({ mesh: postGroup, originalPos: postGroup.position.clone() });
    
    // 横梁（带卯眼，榫头穿透）
    const beamGroup = new THREE.Group();
    
    // 横梁左段
    const beamLeft = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 0.8), wood2);
    beamLeft.position.set(-1.5, 0.8, 0);
    beamLeft.castShadow = true;
    beamGroup.add(beamLeft);
    
    // 横梁右段
    const beamRight = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 0.8), wood2);
    beamRight.position.set(1.5, 0.8, 0);
    beamRight.castShadow = true;
    beamGroup.add(beamRight);
    
    // 卯眼部分（显示榫头穿透）
    const mortiseTop = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.225, 0.8), wood2);
    mortiseTop.position.set(0, 1.0875, 0);
    mortiseTop.castShadow = true;
    beamGroup.add(mortiseTop);
    
    const mortiseBottom = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.225, 0.8), wood2);
    mortiseBottom.position.set(0, 0.5125, 0);
    mortiseBottom.castShadow = true;
    beamGroup.add(mortiseBottom);
    
    scene.add(beamGroup);
    structureParts.push({ mesh: beamGroup, originalPos: beamGroup.position.clone() });
}

export function createHalfLap(scene, structureParts) {
    // 半搭接：两块木材各去掉一半厚度，十字交叉
    const wood1 = new THREE.MeshStandardMaterial({ color: 0xdaa520, roughness: 0.8, metalness: 0.1 });
    const wood2 = new THREE.MeshStandardMaterial({ color: 0xcd853f, roughness: 0.8, metalness: 0.1 });
    
    const thickness = 0.6;
    const halfThick = thickness / 2;
    const width = 0.8;
    const length = 3;
    
    // 横向木条（上半部分被切掉中间）
    const horizontal = new THREE.Group();
    
    // 左段（完整厚度）
    const hLeft = new THREE.Mesh(new THREE.BoxGeometry(1, thickness, width), wood1);
    hLeft.position.set(-1.5, 0, 0);
    hLeft.castShadow = true;
    horizontal.add(hLeft);
    
    // 中段（一半厚度）
    const hMid = new THREE.Mesh(new THREE.BoxGeometry(1, halfThick, width), wood1);
    hMid.position.set(0, halfThick/2, 0);
    hMid.castShadow = true;
    horizontal.add(hMid);
    
    // 右段（完整厚度）
    const hRight = new THREE.Mesh(new THREE.BoxGeometry(1, thickness, width), wood1);
    hRight.position.set(1.5, 0, 0);
    hRight.castShadow = true;
    horizontal.add(hRight);
    
    scene.add(horizontal);
    structureParts.push({ mesh: horizontal, originalPos: horizontal.position.clone() });
    
    // 纵向木条（下半部分被切掉中间）
    const vertical = new THREE.Group();
    
    // 前段（完整厚度）
    const vFront = new THREE.Mesh(new THREE.BoxGeometry(width, thickness, 1), wood2);
    vFront.position.set(0, 0, -1.5);
    vFront.castShadow = true;
    vertical.add(vFront);
    
    // 中段（一半厚度）
    const vMid = new THREE.Mesh(new THREE.BoxGeometry(width, halfThick, 1), wood2);
    vMid.position.set(0, -halfThick/2, 0);
    vMid.castShadow = true;
    vertical.add(vMid);
    
    // 后段（完整厚度）
    const vBack = new THREE.Mesh(new THREE.BoxGeometry(width, thickness, 1), wood2);
    vBack.position.set(0, 0, 1.5);
    vBack.castShadow = true;
    vertical.add(vBack);
    
    scene.add(vertical);
    structureParts.push({ mesh: vertical, originalPos: vertical.position.clone() });
}

export function createFingerJoint(scene, structureParts) {
    // 指接：梳齿状交错结构，用于板材拼接
    const wood1 = new THREE.MeshStandardMaterial({ color: 0xcd853f, roughness: 0.8, metalness: 0.1 });
    const wood2 = new THREE.MeshStandardMaterial({ color: 0xdaa520, roughness: 0.8, metalness: 0.1 });
    
    const fingerWidth = 0.4;
    const fingerLength = 0.6;
    const boardThickness = 0.8;
    const boardHeight = 2.4;
    const numFingers = 6;
    
    // 左侧板
    const leftBoard = new THREE.Group();
    
    // 基座
    const leftBase = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, boardHeight, boardThickness), 
        wood1
    );
    leftBase.position.set(-0.6, 0, 0);
    leftBase.castShadow = true;
    leftBoard.add(leftBase);
    
    // 创建手指（奇数位置）
    for (let i = 0; i < numFingers; i++) {
        if (i % 2 === 0) {
            const finger = new THREE.Mesh(
                new THREE.BoxGeometry(fingerLength, fingerWidth, boardThickness),
                wood1
            );
            const yPos = -boardHeight/2 + fingerWidth/2 + i * fingerWidth;
            finger.position.set(0.3, yPos, 0);
            finger.castShadow = true;
            leftBoard.add(finger);
        }
    }
    
    leftBoard.position.set(-1, 0, 0);
    scene.add(leftBoard);
    structureParts.push({ mesh: leftBoard, originalPos: leftBoard.position.clone() });
    
    // 右侧板
    const rightBoard = new THREE.Group();
    
    // 基座
    const rightBase = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, boardHeight, boardThickness),
        wood2
    );
    rightBase.position.set(0.6, 0, 0);
    rightBase.castShadow = true;
    rightBoard.add(rightBase);
    
    // 创建手指（偶数位置）
    for (let i = 0; i < numFingers; i++) {
        if (i % 2 === 1) {
            const finger = new THREE.Mesh(
                new THREE.BoxGeometry(fingerLength, fingerWidth, boardThickness),
                wood2
            );
            const yPos = -boardHeight/2 + fingerWidth/2 + i * fingerWidth;
            finger.position.set(-0.3, yPos, 0);
            finger.castShadow = true;
            rightBoard.add(finger);
        }
    }
    
    rightBoard.position.set(1, 0, 0);
    scene.add(rightBoard);
    structureParts.push({ mesh: rightBoard, originalPos: rightBoard.position.clone() });
}
