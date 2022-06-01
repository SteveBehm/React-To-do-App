// const $decrease = document.querySelector('.decrease');
// const $increase = document.querySelector('.increase');
// const $reset = document.querySelector('.reset');
const $count = document.querySelector('.count');
const $buttons = document.querySelectorAll('.btn')

// $decrease.addEventListener('click', () => {
//   $count.textContent--;
// })

// $increase.addEventListener('click', () => {
//   $count.textContent++;
// })

// $reset.addEventListener('click', () => {
//   $count.textContent = 0;
// })

// select buttons and loop through

$buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    // change the count depending on the btn clicked
    const styles = e.target.classList;
    if (styles.contains('decrease')) {
      $count.textContent--;
    }
    if (styles.contains('increase')) {
      $count.textContent++;
    }
    if (styles.contains('reset')) {
      $count.textContent = 0;
    }
    // change the color depending on the number
    // being positive or negative
    if($count.textContent > 0) {
      $count.style.color = 'green'
    } else if ($count.textContent < 0) {
      $count.style.color = 'red'
    } else {
      $count.style.color ='brown'
    }
  })
})
