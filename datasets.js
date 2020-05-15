let QuestionDetails = function (id, question, answer, options) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.options = options;
}

let datasets = {
    // for quiz
    questionPool: [
        {
            id: 1,
            question: 'Which is not a transmission method of the Coronavirus?',
            answer: 'Cellular network signals',
            options: ['Direct contact with infected persons', 'Contact with contaminated surfaces', 'Cellular network signals', 'Contact with infected respiratory droplets, as exhaled by an infected person']
        },
        {
            id: 2,
            question: 'When are non-medical masks most effective at slowing the spread of COVID-19?',
            answer: 'When used by infected persons around uninfected',
            options: ['When used by uninfected persons in public places', 'When used by uninfected persons around infected', 'Masks are ineffective at slowing the spread', 'When used by infected persons around uninfected']
        },
        {
            id: 3,
            question: 'Which is NOT a symptom of the Coronavirus?',
            answer: 'Numbness in limbs',
            options: ['Fever', 'Fatigue', 'Headaches', 'Numbness in limbs']
        },
        {
            id: 4,
            question: 'What is the incubation period for the Coronavirus?',
            answer: '',
            options: ['Within 6 hours of infection', 'Within 3-4 weeks of infection', 'The onset of symptoms is entirely random', 'Within two weeks of infection']
        },
        {
            id: 5,
            question: 'Where was the first cases of the Coronavirus discovered?',
            answer: 'Wuhan, China', 
            options: ['Lombardy, Italy', 'Taipei, Taiwain', 'New York, USA', 'Wuhan, China']
        },
        {
            id: 6,
            question: 'What is the minimum amount of time you should wash your hands?',
            answer: '20 seconds',
            options: ['4 seconds', '10 seconds', '20 seconds', '60 seconds']
        },
        {
            id: 7,
            question: 'Which age group is at the greatest risk to the virus?',
            answer: 'Older adults over 75 years',
            options: ['Children under 10 years', 'Teens between 12-17 years', 'Adults between 45-64 years', 'Older adults over 75 years']
        },
        {
            id: 8,
            question: 'What is the global death rate of COVID-19 cases (as of May 2020)?',
            answer: 'About 7%',
            options: ['Under 3%', 'About 7%', 'About 15%', 'Over 20%']
        },
        {
            id: 9,
            question: 'What is the global recovery rate of COVID-19 cases (as of May 2020)?',
            answer: 'About 35%',
            options: ['Under 15%', 'About 25%', 'About 35%', 'About 50%']
        },
        {
            id: 10,
            question: 'As an uninfected person, which is NOT an effective measure for avoiding infection?',
            answer: 'Wipe your nose and eyes with your hands when they feel irritated',
            options: ['Wipe your nose and eyes with your hands when they feel irritated', 'Stay at home, except for essential activities like shopping', 'Wash your hands often with soap and water', 'Keep approximately 2 metres away from other people']
        },
        {
            id: 11,
            question: 'What is NOT effective use of a non-medical face mask?',
            answer: 'Worn by children under 2 years old',
            options: ['Change the mask as soon as possible when it gets damp or dirty', 'Cover your entire nose and mouth area', 'Worn by children under 2 years old', 'Fit securely using ties or ear loops']
        },
        {
            id: 12,
            question: 'What is proper procedure for isolating when you are diagnosed with (or awaiting results for) COVID-19?',
            answer: 'Stay in a separate room and use separate washrooms from others in your home',
            options: ['Cover your mouth and nose with your hands if you need to cough or sneeze', 'Advise people you are in close contact with to wear masks', 'Leave the house only for grocery shopping', 'Stay in a separate room and use separate washrooms from others in your home']
        },
        {
            id: 13,
            question: 'Which of the folloiwing is recommended conduct with regards to social distancing?',
            answer: 'Housemates may ignore social distancing around each other, unless required to self-isolate',
            options: ['Housemates may ignore social distancing around each other, unless required to self-isolate', 'Physical contact like handshakes are acceptable if both people are uninfected', 'Stay and move in small crowds when walking outside', 'Maintain a minimum distance of one arm length away from others']
        },
        {
            id: 14,
            question: 'Which is the most likely infected surface?',
            answer: 'Toilet',
            options: ['Toilet', 'Kitchen countertop', 'Hallway wall', 'Chair seat']
        },
        {
            id: 15,
            question: 'Which of these 4 countries has the most recovered cases (as of May 2020)?',
            answer: 'China',
            options: ['Canada', 'China', 'USA', 'Germany']
        },
        {
            id: 16,
            question: 'Which of these 4 countries has the fewest active cases (as of May 2020)?',
            answer: 'New Zealand',
            options: ['Russia', 'Canada', 'India', 'New Zealand']
        },
        {
            id: 17,
            question: 'Is food a risk factor for transmission?',
            answer: 'No, food has not led to any confirmed cases',
            options: ['Yes, but most areas have taken preventative measures', 'Yes, but it is not a significant risk', 'Yes, transmission by food has significantly affected confirmed cases', 'No, food has not led to any confirmed cases']
        },
        {
            id: 18,
            question: 'If available, how often should you be using hand sanitizer to lower your risk of infection?',
            answer: 'Before and after entering a store or public space',
            options: ['Before touching high-contact surfaces', 'Before and after entering a store or public space', 'Before and after washing your hands', 'Hand sanitizer does not prevent the spread of COVID-19']
        },
        {
            id: 19,
            question: 'Other than store-bought disinfectants, which is the MOST effective cleaner for disinfecting hard surfaces?',
            answer: 'Bleach, with appropriate precautions',
            options: ['Bleach, with appropriate precautions', 'Alcohol-based hand sanitizer', 'Soapy water', 'Rubbing alcohol, with appropriate precautions']
        },
        {
            id: 20,
            question: 'Which of the following professions does not classify as an essential worker?',
            answer: 'Auto dealer',
            options: ['First responder', 'Hydro plant technician', 'Grocery store clerk', 'Auto dealer']
        },
    ],
    // currently just a c&p of the first 5 items from questionPool
    fiveQuestions: [
        {
            id: 1,
            question: 'Which is not a transmission method of the Coronavirus?',
            answer: 'Cellular network signals',
            options: ['Direct contact with infected persons', 'Contact with contaminated surfaces', 'Cellular network signals', 'Contact with infected respiratory droplets, as exhaled by an infected person']
        },
        {
            id: 2,
            question: 'When are non-medical masks most effective at slowing the spread of COVID-19?',
            answer: 'When used by infected persons around uninfected',
            options: ['When used by uninfected persons in public places', 'When used by uninfected persons around infected', 'Masks are ineffective at slowing the spread', 'When used by infected persons around uninfected']
        },
        {
            id: 3,
            question: 'Which is NOT a symptom of the Coronavirus?',
            answer: 'Numbness in limbs',
            options: ['Fever', 'Fatigue', 'Headaches', 'Numbness in limbs']
        },
        {
            id: 4,
            question: 'What is the incubation period for the Coronavirus?',
            answer: '',
            options: ['Within 6 hours of infection', 'Within 3-4 weeks of infection', 'The onset of symptoms is entirely random', 'Within two weeks of infection']
        },
        {
            id: 5,
            question: 'Where was the first cases of the Coronavirus discovered?',
            answer: 'Wuhan, China', 
            options: ['Lombardy, Italy', 'Taipei, Taiwain', 'New York, USA', 'Wuhan, China']
        }
    ],

    // for slides
    slides: {
        safety: [
            {
                id: 1,
                title: "Wash your Hands Often",
                content: "Wash your hands before and after preparing food, tending to someone sick, or treating a wound. Wash before touching your face or eating food, and wash after using the toilet or covering a sneeze, cough, or blowing your nose.",
                page_number: 1,
                img_url: "/css/images/safety_slide/safety1.png",
                is_complete: false
            },
            {
                id: 2,
                title: "Wash your Hands Properly",
                content: "Wash your hands with soap and water, scrubbing for at least 20 seconds. Make sure you get the backs of your hands, between your fingers, and under your nails. Rinse with water and dry your hands.",
                page_number: 2,
                img_url: "/css/images/safety_slide/safety2.png",
                is_complete: false
            },
            {
                id: 3,
                title: "Use Hand Sanitizer",
                content: "Use hand sanitizer if washing your hands for situations soap and water is not readily available. Many stores and public areas have hand sanitizer dispensers, which you should use when you enter and when you leave.",
                page_number: 3,
                img_url: "/css/images/safety_slide/safety3.png",
                is_complete: false
            },
            {
                id: 4,
                title: "High-Contact Surfaces",
                content: "Certain objects and surfaces have higher risk of being infected. These include toilets, electronics, and door handles. These should be cleaned often to minimize risk.",
                img_url: "/css/images/safety_slide/safety4.png",
                is_complete: false
            },
            {
                id: 5,
                title: "Clean High-Contact Surfaces",
                content: "Surfaces that are touched or held often should be disinfected regularly. Use store-bought disinfectant, bleach, or appropriate household cleaners with proper safety precautions.",
                page_number: 5,
                img_url: "/css/images/safety_slide/safety5.png",
                is_complete: false
            },
            {
                id: 6,
                title: "Coughing or Sneezing",
                content: "Do not cover a cough or sneeze with your hands. Cover instead with a tissue or into your elbow. Used tissues should be disposed of as soon as possible, after a single use.",
                page_number: 6,
                img_url: "/css/images/safety_slide/safety6.png",
                is_complete: false
            },
            {
                id: 7,
                title: "Social Distancing",
                content: "Avoid any crowded places or gatherings. Physical contact, such as a handshake, should generally be avoided, even if both people are uninfected. Keep a distance of 2 arms lengths away from others, though farther away is better. Social distancing may be ignored around housemates, if they are not required to isolate.",
                page_number: 7,
                img_url: "/css/images/safety_slide/safety7.png",
                is_complete: false
            },
            {
                id: 8,
                title: "When to Go Outside",
                content: "You may go outside for exercise ( but avoid public gyms), essential travel, or to shop for essential items such as food. However, try to stay home where possible, such as by purchasing groceries online for delivery.",
                page_number: 8,
                img_url: "/css/images/safety_slide/safety8.png",
                is_complete: false
            },
            {
                id: 9,
                title: "Using Face Masks",
                content: "Medical face masks are reserved for health care workers only. Non-medical masks are best used by infected persons around uninfected. A good mask completely covers the nose and mouth and fits securely around the head using loops or ties. Change the mask as soon as it gets damp or dirty. Do not give masks to children under 2 years old.",
                page_number: 9,
                img_url: "/css/images/safety_slide/safety9.png",
                is_complete: false
            },
            {
                id: 10,
                title: "Self-Isolation",
                content: "You must self-isolate at home for at least 14 days after travelling or coming into close contact with an infected person. Monitor yourself for symptoms of COVID-19 and avoid contact with others. Food and other supplies should be delivered and dropped off at your door during this period.",
                page_number: 10,
                img_url: "/css/images/safety_slide/safety10.png",
                is_complete: false
            }
        ]
    }
}

// taken from James Coglan https://stackoverflow.com/questions/5223/length-of-a-javascript-object


  module.exports = datasets;