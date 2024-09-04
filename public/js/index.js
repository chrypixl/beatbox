const keys = document.querySelectorAll('.key');
  
function playSound(event) {
  event.preventDefault();
  
  const audio = document.querySelector(`audio[data-key = "${event.keyCode}"]`);
  const key = document.querySelector(`.key[data-key = "${event.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  addTrackToStream(audio.src);
  key.classList.add('playing');
};

function removeTransition(event) {
  if(event.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

window.addEventListener('keydown', playSound)
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
