'use strict';

let movies = [
	{
	    "id": 1,
	    "title": "Mad Max: Fury Road",
	    "year": 2015,
	    "DirectorId": 2,
	    "genre": "Action, Adventure, Sci-Fi",
	    "description": "An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and almost everyone is crazed fighting for the necessities of life. Within this world exist two rebels on the run who just might be able to restore order. There's Max, a man of action and a man of few words, who seeks peace of mind following the loss of his wife and child in the aftermath of the chaos. And Furiosa, a woman of action and a woman who believes her path to survival may be achieved if she can make it across the desert back to her childhood homeland.",
	    "coverImg": "1473557557765-mad-max-fury-road.jpg",
	    "synopsis": "A woman rebels against a tyrannical ruler in postapocalyptic Australia in search for her home-land with the help of a group of female prisoners, a psychotic worshipper, and a drifter named Max.",
	    "rating": 4,
	    "createdAt": "2016-08-08T12:48:06.006Z",
	    "updatedAt": "2016-09-11T01:32:42.189Z",
	    "Director": {
	      "id": 2,
	      "firstName": "George",
	      "lastName": "Miller",
	      "bio": "George Miller is an Australian film director, screenwriter, producer, and former medical doctor. He is best known for his Mad Max franchise, with The Road Warrior and Fury Road being hailed as amongst the greatest action films of all time.",
	      "createdAt": "2016-08-08T12:47:13.874Z",
	      "updatedAt": "2016-08-08T12:47:13.874Z"
	    }
	  },
	  {
	    "id": 6,
	    "title": "2001: A Space Odyssey",
	    "year": 1968,
	    "DirectorId": 14,
	    "genre": "Adventure, Mystery, Sci-Fi",
	    "description": "\"2001\" is a story of evolution. Sometime in the distant past, someone or something nudged evolution by placing a monolith on Earth (presumably elsewhere throughout the universe as well). Evolution then enabled humankind to reach the moon's surface, where yet another monolith is found, one that signals the monolith placers that humankind has evolved that far. Now a race begins between computers (HAL) and human (Bowman) to reach the monolith placers. The winner will achieve the next step in evolution, whatever that may be.",
	    "coverImg": "1473557313984-2001-a-space-odyssey.jpg",
	    "synopsis": "Humanity finds a mysterious, obviously artificial object buried beneath the Lunar surface and, with the intelligent computer H.A.L. 9000, sets off on a quest.",
	    "rating": 5,
	    "createdAt": "2016-08-08T22:27:39.017Z",
	    "updatedAt": "2016-09-11T01:28:37.920Z",
	    "Director": {
	      "id": 14,
	      "firstName": "Stanley",
	      "lastName": "Kubrick",
	      "bio": "Stanley Kubrick was born in Manhattan, New York City, to Sadie Gertrude (Perveler) and Jacob Leonard Kubrick, a physician. His family were Jewish immigrants (from Austria, Romania, and Russia). Stanley was considered intelligent, despite poor grades at school.",
	      "createdAt": "2016-08-08T22:27:38.873Z",
	      "updatedAt": "2016-08-08T22:27:38.873Z"
	    }
	  },
	  {
	    "id": 4,
	    "title": "Citizen Kane",
	    "year": 1941,
	    "DirectorId": 13,
	    "genre": "Drama, Mystery",
	    "description": "A group of reporters are trying to decipher the last word ever spoken by Charles Foster Kane, the millionaire newspaper tycoon: \"Rosebud.\" The film begins with a news reel detailing Kane's life for the masses, and then from there, we are shown flashbacks from Kane's life. As the reporters investigate further, the viewers see a display of a fascinating man's rise to fame, and how he eventually fell off the top of the world.",
	    "coverImg": "1472613029716-citizen-kane.jpg",
	    "synopsis": "Following the death of a publishing tycoon, news reporters scramble to discover the meaning of his final utterance.",
	    "rating": 5,
	    "createdAt": "2016-08-08T22:04:05.602Z",
	    "updatedAt": "2016-08-31T03:10:33.861Z",
	    "Director": {
	      "id": 13,
	      "firstName": "Orsen",
	      "lastName": "Welles",
	      "bio": "His father was a well-to-do inventor, his mother a beautiful concert pianist; Orson Welles was gifted in many arts (magic, piano, painting) as a child. When his mother died (he was seven) he traveled the world with his father. When his father died (he was fifteen) he became the ward of Chicago's Dr. Maurice Bernstein.",
	      "createdAt": "2016-08-08T22:04:05.390Z",
	      "updatedAt": "2016-08-08T22:04:05.390Z"
	    }
	  },
	  {
	    "id": 2,
	    "title": "The Matrix",
	    "year": 1999,
	    "DirectorId": 3,
	    "genre": "Action, Sci-Fi",
	    "description": "Thomas A. Anderson is a man living two lives. By day he is an average computer programmer and by night a hacker known as Neo. Neo has always questioned his reality, but the truth is far beyond his imagination. Neo finds himself targeted by the police when he is contacted by Morpheus, a legendary computer hacker branded a terrorist by the government. Morpheus awakens Neo to the real world, a ravaged wasteland where most of humanity have been captured by a race of machines that live off of the humans' body heat and electrochemical energy and who imprison their minds within an artificial reality known as the Matrix. As a rebel against the machines, Neo must return to the Matrix and confront the agents: super-powerful computer programs devoted to snuffing out Neo and the entire human rebellion.",
	    "coverImg": "1472612973288-the-matrix.jpg",
	    "synopsis": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
	    "rating": 5,
	    "createdAt": "2016-08-08T12:49:38.716Z",
	    "updatedAt": "2016-08-31T03:09:36.356Z",
	    "Director": {
	      "id": 3,
	      "firstName": "Lana, Lilly",
	      "lastName": "Wachowski",
	      "bio": "Lana Wachowski and her sister Lilly Wachowski, (also known as 'The Wachowskis') are the duo behind ground-breaking movies such as The Matrix (1999) and Cloud Atlas (2012). Born to mother Lynne, a nurse, and father Ron, a businessman of Polish descent, Wachowski grew up in Chicago and formed a tight creative relationship with her sister Lilly.",
	      "createdAt": "2016-08-08T12:49:38.562Z",
	      "updatedAt": "2016-08-08T12:49:38.562Z"
	    }
	  },
	  {
	    "id": 7,
	    "title": "The Godfather",
	    "year": 1972,
	    "DirectorId": 15,
	    "genre": "Crime, Drama",
	    "description": "When the aging head of a famous crime family decides to transfer his position to one of his subalterns, a series of unfortunate events start happening to the family, and a war begins between all the well-known families leading to insolence, deportation, murder and revenge, and ends with the favorable successor being finally chosen.",
	    "coverImg": "1472612889952-the-godfather.jpg",
	    "synopsis": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
	    "rating": 5,
	    "createdAt": "2016-08-08T23:47:48.107Z",
	    "updatedAt": "2016-08-31T03:08:25.663Z",
	    "Director": {
	      "id": 15,
	      "firstName": "Francis Ford",
	      "lastName": "Coppola",
	      "bio": "Francis Ford Coppola was born in 1939 in Detroit, Michigan, but grew up in a New York suburb in a creative, supportive Italian-American family. His father, Carmine Coppola, was a composer and musician. His mother, Italia Coppola (née Pennino), had been an actress.",
	      "createdAt": "2016-08-08T23:47:47.901Z",
	      "updatedAt": "2016-08-08T23:47:47.901Z"
	    }
	  },
	  {
	    "id": 18,
	    "title": "It's a Wonderful Life",
	    "year": 1946,
	    "DirectorId": 29,
	    "genre": "Drama, Family, Fantasy",
	    "description": "George Bailey has spent his entire life giving of himself to the people of Bedford Falls. He has always longed to travel but never had the opportunity in order to prevent rich skinflint Mr. Potter from taking over the entire town. All that prevents him from doing so is George's modest building and loan company, which was founded by his generous father. But on Christmas Eve, George's Uncle Billy loses the business's $8,000 while intending to deposit it in the bank. Potter finds the misplaced money and hides it from Billy. When the bank examiner discovers the shortage later that night, George realizes that he will be held responsible and sent to jail and the company will collapse, finally allowing Potter to take over the town. Thinking of his wife, their young children, and others he loves will be better off with him dead, he contemplates suicide. But the prayers of his loved ones result in a gentle angel named Clarence coming to earth to help George, with the promise of earning his wings. He shows George what things would have been like if he had never been born. In a nightmarish vision in which the Potter-controlled town is sunk in sex and sin, those George loves are either dead, ruined, or miserable. He realizes that he has touched many people in a positive way and that his life has truly been a wonderful one.",
	    "coverImg": "1472608592541-its-a-wonderful-life.jpg",
	    "synopsis": "An angel helps a compassionate but despairingly frustrated businessman by showing what life would have been like if he never existed.",
	    "rating": 5,
	    "createdAt": "2016-08-31T01:57:40.197Z",
	    "updatedAt": "2016-08-31T01:57:40.197Z",
	    "Director": {
	      "id": 29,
	      "firstName": "Frank",
	      "lastName": "Capra",
	      "bio": "One of seven children, Frank Capra was born on May 18, 1897, in Bisacquino, Sicily. On May 10, 1903, his family left for America aboard the ship Germania, arriving in New York on May 23rd.",
	      "createdAt": "2016-08-31T01:57:39.937Z",
	      "updatedAt": "2016-08-31T01:57:39.937Z"
	    }
	  },
	  {
	    "id": 9,
	    "title": "Eyes Wide Shut",
	    "year": 1999,
	    "DirectorId": 14,
	    "genre": "Drama, Mystery, Thriller",
	    "description": "After his wife, Alice, tells him about her sexual fantasies, William Harford sets out for a night of sexual adventure. After several less than successful encounters, he meets an old friend, Nick Nightingale - now a musician - who tells him of strange sex parties when he is required to play the piano blindfolded. All the men at the party are costumed and wear masks while the women are all young and beautiful. Harford manages to find an appropriate costume and heads out to the party. Once there, however, he is warned by someone who recognizes him, despite the mask, that he is in great danger. He manages to extricate himself but the threats prove to be quite real and sinister.",
	    "coverImg": "1472422475535-eyes-wide-shut.jpg",
	    "synopsis": "A New York City doctor, who is married to an art curator, pushes himself on a harrowing and dangerous night-long odyssey of sexual and moral discovery after his wife admits that she once almost cheated on him.",
	    "rating": 5,
	    "createdAt": "2016-08-08T23:52:28.626Z",
	    "updatedAt": "2016-08-28T22:14:38.737Z",
	    "Director": {
	      "id": 14,
	      "firstName": "Stanley",
	      "lastName": "Kubrick",
	      "bio": "Stanley Kubrick was born in Manhattan, New York City, to Sadie Gertrude (Perveler) and Jacob Leonard Kubrick, a physician. His family were Jewish immigrants (from Austria, Romania, and Russia). Stanley was considered intelligent, despite poor grades at school.",
	      "createdAt": "2016-08-08T22:27:38.873Z",
	      "updatedAt": "2016-08-08T22:27:38.873Z"
	    }
	  },
	  {
	    "id": 14,
	    "title": "Iron Man",
	    "year": 2008,
	    "DirectorId": 23,
	    "genre": "Action, Adventure, Sci-Fi",
	    "description": "Tony Stark. Genius, billionaire, playboy, philanthropist. Son of legendary inventor and weapons contractor Howard Stark. When Tony Stark is assigned to give a weapons presentation to an Iraqi unit led by Lt. Col. James Rhodes, he's given a ride on enemy lines. That ride ends badly when Stark's Humvee that he's riding in is attacked by enemy combatants. He survives - barely - with a chest full of shrapnel and a car battery attached to his heart. In order to survive he comes up with a way to miniaturize the battery and figures out that the battery can power something else. Thus Iron Man is born. He uses the primitive device to escape from the cave in Iraq. Once back home, he then begins work on perfecting the Iron Man suit. But the man who was put in charge of Stark Industries has plans of his own to take over Tony's technology for other matters.",
	    "coverImg": "1472422425865-iron-man.jpg",
	    "synopsis": "After being held captive in an Afghan cave, a billionaire engineer creates a unique weaponized suit of armor to fight evil.",
	    "rating": 3,
	    "createdAt": "2016-08-09T23:33:28.001Z",
	    "updatedAt": "2016-08-28T22:13:57.431Z",
	    "Director": {
	      "id": 23,
	      "firstName": "Jon",
	      "lastName": "Favreau",
	      "bio": "Initially an indie film favorite, actor Jon Favreau has progressed to strong mainstream visibility into the millennium and, after nearly two decades in the business, is still enjoying character stardom as well as earning notice as a writer/producer/director.",
	      "createdAt": "2016-08-09T23:33:27.763Z",
	      "updatedAt": "2016-08-09T23:33:27.763Z"
	    }
	  },
	  {
	    "id": 8,
	    "title": "Pulp Fiction",
	    "year": 1994,
	    "DirectorId": 16,
	    "genre": "Crime, Drama",
	    "description": "Jules Winnfield and Vincent Vega are two hitmen who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace. Wallace has also asked Vincent to take his wife Mia out a few days later when Wallace himself will be out of town. Butch Coolidge is an aging boxer who is paid by Wallace to lose his next fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.",
	    "coverImg": "1472422387859-pulp-fiction.jpg",
	    "synopsis": "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
	    "rating": 4,
	    "createdAt": "2016-08-08T23:50:12.949Z",
	    "updatedAt": "2016-08-28T22:13:13.563Z",
	    "Director": {
	      "id": 16,
	      "firstName": "Quentin",
	      "lastName": "Tarantino",
	      "bio": "Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee. Quentin moved with his mother to Torrance, California, when he was four years old.",
	      "createdAt": "2016-08-08T23:50:12.800Z",
	      "updatedAt": "2016-08-08T23:50:12.800Z"
	    }
	  },
	  {
	    "id": 5,
	    "title": "Batman Begins",
	    "year": 2005,
	    "DirectorId": 1,
	    "genre": "Action Adventur",
	    "description": "When his parents are killed, billionaire playboy Bruce Wayne relocates to Asia where he is mentored by Henri Ducard and Ra's Al Ghul in how to fight evil. When learning about the plan to wipe out evil in Gotham City by Ducard, Bruce prevents this plan from getting any further and heads back to his home. Back in his original surroundings, Bruce adopts the image of a bat to strike fear into the criminals and the corrupt as the icon known as 'Batman'. But it doesn't stay quiet for long.",
	    "coverImg": "1472422352034-batman-begins.jpg",
	    "synopsis": "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from the corruption that Scarecrow and the League of Shadows have cast upon it.",
	    "rating": 4,
	    "createdAt": "2016-08-08T22:25:28.369Z",
	    "updatedAt": "2016-08-28T22:12:35.898Z",
	    "Director": {
	      "id": 1,
	      "firstName": "Christopher",
	      "lastName": "Nolan",
	      "bio": "Best known for his cerebral, often nonlinear story-telling, acclaimed writer-director Christopher Nolan was born on July 30, 1970 in London, England. Over the course of 15 years of film-making, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.",
	      "createdAt": "2016-08-08T12:46:38.778Z",
	      "updatedAt": "2016-08-08T12:46:38.778Z"
	    }
	  },
	  {
	    "id": 3,
	    "title": "Casablanca",
	    "year": 1942,
	    "DirectorId": 4,
	    "genre": "Drama, Romance, War",
	    "description": "In World War II Casablanca, Rick Blaine, exiled American and former freedom fighter, runs the most popular nightspot in town. The cynical lone wolf Blaine comes into the possession of two valuable letters of transit. When Nazi Major Strasser arrives in Casablanca, the sycophantic police Captain Renault does what he can to please him, including detaining a Czechoslovak underground leader Victor Laszlo. Much to Rick's surprise, Lazslo arrives with Ilsa, Rick's one time love. Rick is very bitter towards Ilsa, who ran out on him in Paris, but when he learns she had good reason to, they plan to run off together again using the letters of transit.",
	    "coverImg": "1472421970299-casablanca.jpg",
	    "synopsis": "In Casablanca, Morocco in December 1941, a cynical American expatriate meets a former lover, with unforeseen complications.",
	    "rating": 4,
	    "createdAt": "2016-08-08T21:16:20.904Z",
	    "updatedAt": "2016-08-28T22:06:14.323Z",
	    "Director": {
	      "id": 4,
	      "firstName": "Michael",
	      "lastName": "Curtiz",
	      "bio": "Curtiz began acting in and then directing films in his native Hungary in 1912. After WWI, he continued his filmmaking career in Austria and Germany and into the early 1920s when he directed films in other countries in Europe. Moving to the US in 1926, he started making films in Hollywood for Warner Bros.",
	      "createdAt": "2016-08-08T21:16:20.704Z",
	      "updatedAt": "2016-08-08T21:16:20.704Z"
	    }
	  }
];

module.exports = movies;
