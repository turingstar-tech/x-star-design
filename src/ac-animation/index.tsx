import React, { useEffect } from 'react';
import { AcAnimationProps, ImgShowProps, titleShowProps } from './define';

const AcAnimation: React.FC<AcAnimationProps> = ({
  title,
  imgUrl,
  imgSizeAndPosition = { scale: 1, offsetX: 0, offsetY: 0 },
  titleStyle,
}) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  let AnimationID = -1;
  const confetti: any[] = [];
  const confettiCount = 300;
  const gravity = 0.5;
  const terminalVelocity = 5;
  const drag = 0.075;
  const colors = [
    { front: 'red', back: 'darkred' },
    { front: 'green', back: 'darkgreen' },
    { front: 'blue', back: 'darkblue' },
    { front: 'yellow', back: 'darkyellow' },
    { front: 'orange', back: 'darkorange' },
    { front: 'pink', back: 'darkpink' },
    { front: 'purple', back: 'darkpurple' },
    { front: 'turquoise', back: 'darkturquoise' },
  ];

  const img = new Image();
  img.src = imgUrl || '';

  useEffect(() => {
    if (canvas) {
      canvas.style.zIndex = '9999';
      canvas.style.width = '60vw';
      canvas.style.height = '60vh';
      canvas.style.position = 'absolute';
      canvas.style.top = '50%';
      canvas.style.left = '50%';
      canvas.style.transform = 'translate(-50%, -50%)';
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, [canvas]);

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const renderImg = (imgSizeAndPosition: ImgShowProps) => {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.drawImage(
      img,
      imgSizeAndPosition.offsetX! ||
        0 - (img.width * (imgSizeAndPosition.scale! || 1)) / 2,
      imgSizeAndPosition.offsetY! ||
        0 - (img.height * (imgSizeAndPosition.scale! || 1)) / 2,
      img.width * (imgSizeAndPosition.scale! || 1),
      img.height * (imgSizeAndPosition.scale! || 1),
    );
    ctx.restore();
  };

  const renderText = (titleStyle?: titleShowProps) => {
    ctx.save();
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 4;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold 
		${titleStyle?.fontSize || 36}px 
		${titleStyle?.fontFamily || 'Arial'}`;
    ctx.fillStyle = titleStyle?.color || '#022679';
    ctx.shadowColor = titleStyle?.fontFamily || 'rgba(2,38,121,0.2)';
    ctx.fillText(
      title || '',
      canvas.width / 2 + (titleStyle?.offsetX || 0),
      canvas.height / 2 + (titleStyle?.offsetY || 0),
    );
    ctx.restore();
  };

  const randomRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const initConfetti = () => {
    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        color: colors[Math.floor(randomRange(0, colors.length))],
        dimensions: {
          x: randomRange(10, 20),
          y: randomRange(10, 30),
        },

        position: {
          x: randomRange(0, canvas.width),
          y: canvas.height - 1,
        },

        rotation: randomRange(0, 2 * Math.PI),
        scale: {
          x: 1,
          y: 1,
        },

        velocity: {
          x: randomRange(-25, 25),
          y: randomRange(0, -50),
        },
      });
    }
  };

  //---------Render-----------
  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (title) {
      renderText(titleStyle);
    }
    if (imgUrl) {
      renderImg(imgSizeAndPosition);
    }
    confetti.forEach((confetto, index) => {
      const width = confetto.dimensions.x * confetto.scale.x;
      const height = confetto.dimensions.y * confetto.scale.y;

      // Move canvas to position and rotate
      ctx.translate(confetto.position.x, confetto.position.y);
      ctx.rotate(confetto.rotation);

      // Apply forces to velocity
      confetto.velocity.x -= confetto.velocity.x * drag;
      confetto.velocity.y = Math.min(
        confetto.velocity.y + gravity,
        terminalVelocity,
      );
      confetto.velocity.x +=
        Math.random() > 0.5 ? Math.random() : -Math.random();

      // Set position
      confetto.position.x += confetto.velocity.x;
      confetto.position.y += confetto.velocity.y;

      // Delete confetti when out of frame
      if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

      // Loop confetto x position
      if (confetto.position.x > canvas.width) confetto.position.x = 0;
      if (confetto.position.x < 0) confetto.position.x = canvas.width;

      // Spin confetto by scaling y
      confetto.scale.y = Math.cos(confetto.position.y * 0.1);
      ctx.fillStyle =
        confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

      // Draw confetti
      ctx.fillRect(-width / 2, -height / 2, width, height);

      // Reset transform matrix
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    });

    if (confetti.length <= 10) {
      canvas.remove();
      window.cancelAnimationFrame(AnimationID);
      return;
    }

    AnimationID = window.requestAnimationFrame(render);
  };

  //----------Resize----------
  window.addEventListener('resize', function () {
    resizeCanvas();
  });

  useEffect(() => {
    initConfetti();
    render();
    document.getElementById('ac-canvas')?.appendChild(canvas);
  }, []);

  return (
    <>
      <div
        id="ac-canvas"
        onClick={() => {
          canvas.remove();
          window.cancelAnimationFrame(AnimationID);
        }}
      ></div>
    </>
  );
};

export default AcAnimation;
