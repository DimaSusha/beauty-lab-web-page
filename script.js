/*******************HEADER***************************/ 

// Get the header element
const header = document.querySelector("header");

window.addEventListener("scroll", function () { 
  header.classList.toggle("section-header", window.scrollY > 0);
});


// Function to hide header with smooth animation
function hideHeader() {
  header.style.transition = 'all 0.1s ease-in-out';
  header.style.opacity = '0';
  header.style.pointerEvents = 'none';
};

// Function to show header with smooth animation
function showHeader() {
  header.style.transition = 'all 0.8s ease-in-out';
  header.style.opacity = '1';
  header.style.pointerEvents = 'auto';
};


/*******************SCROLLING ANIMATION***************************/

const sections = document.querySelectorAll('section');
const windowHeight = window.innerHeight;

function fadeInElements() {
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < windowHeight * 0.8) {
      section.classList.add('fadeIn');
    }
  }
}

fadeInElements();

window.addEventListener('scroll', () => {
  fadeInElements();
});

/*******************OPEN AND CLOSE MODAL***************************/ 


// Get all the modal buttons
const modalBtns = document.querySelectorAll('.btn-price');
// Get all the close buttons
const closeBtns = document.querySelectorAll('.close-btn');
// Get all the modals
const modals = document.querySelectorAll('.price-modal');
// Get the body element
const body = document.querySelector('body');


// Loop through each button and attach click event listener
modalBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    // Call the openModal function with the modal ID as the argument
    openModal(btn.dataset.modal);
  });
});


// Loop through each close button and attach click event listener
closeBtns.forEach(function(btn) {
  btn.addEventListener('click', closeModal);
});


// Function to open modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'block';
  body.style.overflow = 'hidden';
  hideHeader();
};



// Function to close modal
function closeModal() {
  modals.forEach(function(modal) {
    modal.style.display = 'none';
  });
  body.style.overflowY = 'auto';
  body.style.paddingRight = '0';
  showHeader();
};


//Function to close modal if click outside 
window.addEventListener('click', clickOutside);

function clickOutside(e){
  modals.forEach(function(modal) {
    if (e.target == modal) {
        modal.style.display = 'none';
        body.style.overflowY = 'auto';
        body.style.paddingRight = '0';
        showHeader();
    }
  });
  
};


/*******************ACCORDION IN MODAL POP-UP***************************/ 

const acc = document.getElementsByClassName('btn-accordion');

let currentAccordion = null;

for (let i = 0; i < acc.length; i++) {
  acc[i].onclick = function () {
    if (currentAccordion !== null && currentAccordion !== this) {
      // Close the previously open accordion
      currentAccordion.classList.remove('active');
      currentAccordion.nextElementSibling.classList.remove('show');
    }
    // Toggle the clicked accordion
    this.classList.toggle('active');
    this.nextElementSibling.classList.toggle('show');
    // Update the currently open accordion
    currentAccordion = this.classList.contains('active') ? this : null;
  };
};


/**********ROTATE SHEVRON***********/

// Get all the buttons and chevron-down SVG elements
const btnAccordions = document.querySelectorAll('.btn-accordion');
const chevronDowns = document.querySelectorAll('.chevron-down');

// Loop through each button
btnAccordions.forEach((btnAccordion, index) => {
  // Add a click event listener to the button
  btnAccordion.addEventListener('click', () => {
    // Check if the corresponding chevron-down SVG element has the 'active' class
    if (chevronDowns[index].classList.contains('active')) {
      // Remove the 'active' class from the corresponding chevron-down SVG element
      chevronDowns[index].classList.remove('active');
    } else {
      // Loop through each chevron-down SVG element
      chevronDowns.forEach((chevronDown) => {
        // Remove the 'active' class from all chevron-down SVG elements
        chevronDown.classList.remove('active');
      });

      // Add the 'active' class to the corresponding chevron-down SVG element
      chevronDowns[index].classList.add('active');
    }
  });
});


/***********COSMETICS SECTION*********/ 

const carousel = document.querySelector(".carousel");
const arrowIcons = document.querySelectorAll(".fa-solid");
const firstImg = carousel.querySelectorAll(".composition__photo")[0];

let isDragStart = false, prevPageX, prevScrollLeft;


const showHideIcons = () => {
  // showing and hiding prev/next icon according to carousel scroll left value
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display = carousel.scrollLeft >= scrollWidth ? "none" : "block";
};

arrowIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 12;
    // if clicked icon is left, reduce width value from the carousel scroll left else add to it
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60); //calling showHideIcons after 60ms
  });
});

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) =>  {
  //scrolling images to left according to mouse pointer
  if(!isDragStart) return;
  e.preventDefault();
  carousel.classList.add("dragging");
  let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
}



const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);

/***********CONTACTS SECTION*********/ 

const textSocial = document.querySelectorAll('.text-social p');
textSocial.forEach((element) => {
  element.innerHTML = element.innerText.split("").map(
    (char, i) =>
      `<span style="transform:rotate(${i * 12}deg)">${char}</span>`
  ).join("");
});


/********************SET CURRENT YEAR*****************/

const year = document.querySelector('.year');
const currentYear = new Date().getFullYear();
year.textContent = currentYear;
