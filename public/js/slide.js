// slide navigation

const slides = [
  {
    id: 1,
    title: "Wash your Hands Often",
    content:
      "Wash your hands before and after preparing food, tending to someone sick, or treating a wound. Wash before touching your face or eating food, and wash after using the toilet or covering a sneeze, cough, or blowing your nose.",
    page_number: 1,
    img_url: "/css/images/safety_slide/safety1.png",
    is_complete: false,
  },
  {
    id: 2,
    title: "Wash your Hands Properly",
    content:
      "Wash your hands with soap and water, scrubbing for at least 20 seconds. Make sure you get the backs of your hands, between your fingers, and under your nails. Rinse with water and dry your hands.",
    page_number: 2,
    img_url: "/css/images/safety_slide/safety2.png",
    is_complete: false,
  },
  {
    id: 3,
    title: "Use Hand Sanitizer",
    content:
      "Use hand sanitizer if washing your hands for situations soap and water is not readily available. Many stores and public areas have hand sanitizer dispensers, which you should use when you enter and when you leave.",
    page_number: 3,
    img_url: "/css/images/safety_slide/safety3.png",
    is_complete: false,
  },
  {
    id: 4,
    title: "High-Contact Surfaces",
    content:
      "Certain objects and surfaces have higher risk of being infected. These include toilets, electronics, and door handles. These should be cleaned often to minimize risk.",
    page_number: 4,
    img_url: "/css/images/safety_slide/safety4.png",
    is_complete: false,
  },
  {
    id: 5,
    title: "Clean High-Contact Surfaces",
    content:
      "Surfaces that are touched or held often should be disinfected regularly. Use store-bought disinfectant, bleach, or appropriate household cleaners with proper safety precautions.",
    page_number: 5,
    img_url: "/css/images/safety_slide/safety5.png",
    is_complete: false,
  },
  {
    id: 6,
    title: "Coughing or Sneezing",
    content:
      "Do not cover a cough or sneeze with your hands. Cover instead with a tissue or into your elbow. Used tissues should be disposed of as soon as possible, after a single use.",
    page_number: 6,
    img_url: "/css/images/safety_slide/safety6.png",
    is_complete: false,
  },
  {
    id: 7,
    title: "Social Distancing",
    content:
      "Avoid any crowded places or gatherings. Physical contact, such as a handshake, should generally be avoided, even if both people are uninfected. Keep a distance of 2 arms lengths away from others, though farther away is better. Social distancing may be ignored around housemates, if they are not required to isolate.",
    page_number: 7,
    img_url: "/css/images/safety_slide/safety7.png",
    is_complete: false,
  },
  {
    id: 8,
    title: "When to Go Outside",
    content:
      "You may go outside for exercise ( but avoid public gyms), essential travel, or to shop for essential items such as food. However, try to stay home where possible, such as by purchasing groceries online for delivery.",
    page_number: 8,
    img_url: "/css/images/safety_slide/safety8.png",
    is_complete: false,
  },
  {
    id: 9,
    title: "Using Face Masks",
    content:
      "Medical face masks are reserved for health care workers only. Non-medical masks are best used by infected persons around uninfected. A good mask completely covers the nose and mouth and fits securely around the head using loops or ties. Change the mask as soon as it gets damp or dirty. Do not give masks to children under 2 years old.",
    page_number: 9,
    img_url: "/css/images/safety_slide/safety9.png",
    is_complete: false,
  },
  {
    id: 10,
    title: "Self-Isolation",
    content:
      "You must self-isolate at home for at least 14 days after travelling or coming into close contact with an infected person. Monitor yourself for symptoms of COVID-19 and avoid contact with others. Food and other supplies should be delivered and dropped off at your door during this period.",
    page_number: 10,
    img_url: "/css/images/safety_slide/safety10.png",
    is_complete: false,
  },
];
let slideIndex = 0;
// let currentSlide = slides[slideIndex];

function changeSlide() {
  let currentSlide = slides[slideIndex];
  $("#page_number").text(currentSlide.page_number);
  $("#title").text(currentSlide.title);
  $("#content").text(currentSlide.content);
  $("#slideImg").attr("src", currentSlide.img_url);
}

$(document).ready(function () {
  $("#nextbtn").on("click", function () {
    if (slideIndex < slides.length - 1) {
      // console.log(slideIndex);
      ++slideIndex;

      changeSlide();
    }
  });

  $("#backbtn").on("click", function () {
    if (slideIndex > 0) {
      --slideIndex;
      changeSlide();
    }
  });
});
