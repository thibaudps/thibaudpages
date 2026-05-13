// ============================================================
//  CONFIG.JS — Tout le contenu du site est ici.
//  C'est le seul fichier à modifier pour changer le contenu.
// ============================================================

const CONFIG = {

  // ── Identité ──────────────────────────────────────────────
  name: 'THIBAUD PAGÈS',
  nameShort: "TPD",
  tagline: "Design graphique & Illustration",
  description: "Je travaille avec des structures culturelles et associatives en France et en Suisse romande.",
  ctaLabel: "Voir les projets",
  url: "thibaudpages.com",
  location: "Made by yours truly in 2026",

  // ── Musique d'ambiance ────────────────────────────────────
  // file   : chemin vers le fichier audio (mp3, wav, m4a…)
  // artist : nom de l'artiste
  // title  : nom du morceau
  music: {
    file: "public/music/chill.mp3",
    artist: "Alex Morgan",
    title: "Autumn Leaves Falling",
  },

  // ── Navigation ────────────────────────────────────────────
  nav: [
    { label: "Projects",  href: "projets.html" },
    { label: "About me",  href: "about.html"   },
    { label: "Contact",   href: "contact.html" },
  ],

  // ── Titre hero (HTML autorisé : <em> pour l'italique) ─────
  heroTitle: "Identités, affiches<br>et illustrations pour les<br><em>acteurs culturels</em>",

  // ── Filtres de la grille ──────────────────────────────────
  filters: [
    "All",
    "Identity",
    "Print",
    "Illustration",
    "Edition",
    "Web",
  ],

  // ── Projets ───────────────────────────────────────────────
  projects: [
    {
      title: "Hopi dans son Jardin",
      titleEn: "Hopi dans son Jardin",
      cat: "Edition",
      year: "2025",
      image: 'public/images/projects/hopi.webp',
      crop: {
        zoom: 1.4,        // niveau de zoom (1 = image entière, 2 = très zoomé)
        x: 50,            // position horizontale du centre du cadrage (en %)
        y: 27,            // position verticale du centre du cadrage (en %)
     },
      href: "#",
      details: {
      description: "Imagier interactif pour enfants autour du jardin et de ses petits habitants. Chaque double-page invite à explorer un nouvel élément du quotidien d'Hopi, dans un univers doux et accessible.",
      descriptionEn: "An interactive picture book for kids exploring the garden and its little creatures. Each spread invites children to discover a new piece of Hopi's everyday world, in a gentle and welcoming universe.",
      // ── Lecteur de livre interactif ───────────────────────
      // Quand cette propriété est présente, le modal affiche
      // un livre feuilletable (HopiReader) au lieu de la galerie d'images.
      reader: "public/images/projects/hopi/HopiReader.html",
    },
  },

{
      title: "Podcast « La Voie de la Savane »",
      titleEn: "'La Voie de la Savane' Podcast",
      cat: "Illustration",
      year: "2026",
      image: 'public/images/projects/savane.webp',
      crop: {
        zoom: 1.1,        // niveau de zoom (1 = image entière, 2 = très zoomé)
        x: 50,            // position horizontale du centre du cadrage (en %)
        y: 50,            // position verticale du centre du cadrage (en %)
     },
      href: "#",
      details: {
      description: "Série d'illustrations réalisée pour le podcast «\u00a0La Voie de la Savane\u00a0», autour des animaux et des paysages de la savane africaine. Un travail tout en aplats colorés pour habiller chaque épisode.",
      descriptionEn: "A series of illustrations for the podcast 'La Voie de la Savane', celebrating the animals and landscapes of the African savanna. Bold, flat-colored visuals designed to bring each episode to life.",
      images: [
        "public/images/projects/savane6.webp",
        "public/images/projects/savane7.webp",
        "public/images/projects/savane1.webp",
        "public/images/projects/savane2.webp",
        "public/images/projects/savane3.webp",
        "public/images/projects/savane4.webp",
        "public/images/projects/savane5.webp",
        // Tu pourras en ajouter d'autres ici : déclinaisons, applications, mockups...
      ],
    },
  },

{
      title: "Bande dessinée « Manger de saison »",
      titleEn: "Eat Veggies Comic Strip",
      cat: "Edition",
      year: "2026",
      image: 'public/images/projects/bdlegumes1.webp',
      crop: {
        zoom: 1.1,        // niveau de zoom (1 = image entière, 2 = très zoomé)
        x: 50,            // position horizontale du centre du cadrage (en %)
        y: 50,            // position verticale du centre du cadrage (en %)
     },
      href: "#",
      details: {
      description: "Comic strip réalisé pour le département de la Dordogne, autour de la consommation de fruits et légumes de saison. L'idée : sensibiliser de façon ludique, en passant par le ton de la BD plutôt que celui de l'affiche institutionnelle.",
      descriptionEn: "Comic strip created for the Dordogne département, advocating for seasonal fruits and vegetables. The idea: deliver the message through humor and storytelling rather than the usual institutional poster.",
      images: [
        "public/images/projects/bdlegumes.webp",
        // Tu pourras en ajouter d'autres ici : déclinaisons, applications, mockups...
      ],
    },
  },


{
      title: "Character design de jeu vidéo",
      titleEn: "Videogame Character Design",
      cat: "Illustration",
      year: "2025",
      image: 'public/images/projects/juliette1.webp',
      crop: {
        zoom: 1.4,        // niveau de zoom (1 = image entière, 2 = très zoomé)
        x: 50,            // position horizontale du centre du cadrage (en %)
        y: 35,            // position verticale du centre du cadrage (en %)
     },
      href: "#",
      details: {
      description: "Character design et level design pour un jeu vidéo, réalisé dans le cadre de ma formation. L'occasion d'explorer la cohérence visuelle entre un personnage et son univers, de la silhouette aux décors.",
      descriptionEn: "Character design and level design for a video game project, developed as part of my training. A chance to explore the visual coherence between a character and their world, from silhouettes to environments.",
      images: [
        "public/images/projects/juliette4.webp",
        "public/images/projects/juliette2.webp",
        "public/images/projects/juliette3.webp",
        "public/images/projects/juliette1.webp",
        // Tu pourras en ajouter d'autres ici : déclinaisons, applications, mockups...
      ],
    },
  },

{
      title: "Peintures d'extraterrestres perdus",
      titleEn: "Lost Alien Paintings",
      cat: "Print",
      year: "2025",
      image: 'public/images/projects/muchaalien.webp',
      crop: {
        zoom: 1.4,        // niveau de zoom (1 = image entière, 2 = très zoomé)
        x: 50,            // position horizontale du centre du cadrage (en %)
        y: 35,            // position verticale du centre du cadrage (en %)
     },
      href: "#",
      details: {
      description: "Série d'illustrations imaginaire autour d'un alien échoué sur une planète inconnue, en hommage à trois influences majeures : Alphonse Mucha pour les compositions ornementales, Keith Haring pour le trait franc, et Mathieu Bablet pour la science-fiction contemplative.",
      descriptionEn: "An imaginary illustration series following an alien stranded on an unknown planet, paying tribute to three major influences: Alphonse Mucha for ornamental compositions, Keith Haring for bold linework, and Mathieu Bablet for contemplative sci-fi.",
      images: [
        "public/images/projects/muchaalien.webp",
        "public/images/projects/babletalien.webp",
        "public/images/projects/keithalien.webp",
        // Tu pourras en ajouter d'autres ici : déclinaisons, applications, mockups...
      ],
    },
  },

{
      title: "Semainier pour enfants",
      titleEn: "Children Weekly Planner",
      cat: "Print",
      year: "2026",
      image: 'public/images/projects/semainier.webp',
      crop: {
        zoom: 1.1,        // niveau de zoom (1 = image entière, 2 = très zoomé)
        x: 50,            // position horizontale du centre du cadrage (en %)
        y: 12,            // position verticale du centre du cadrage (en %)
     },
      href: "#",
      details: {
      description: "Semainier illustré commandé pour aider un enfant à organiser sa semaine. Pensé comme un outil ludique et coloré, où chaque jour a son ambiance et où il y a toujours quelque chose à attendre.",
      descriptionEn: "An illustrated weekly planner commissioned to help a child get organized week by week. Designed as a playful, colorful tool where every day has its own atmosphere and something to look forward to.",
      images: [
        "public/images/projects/semainier2.webp",
        // Tu pourras en ajouter d'autres ici : déclinaisons, applications, mockups...
      ],
    },
  },

{
      title: "Affiche pour la sortie d'album de Lone Assembly",
      titleEn: "Lone Assembly Album Release",
      cat: "Print",
      year: "2026",
      image: 'public/images/projects/loneassembly.webp',
      crop: {
        zoom: 1.1,        // niveau de zoom (1 = image entière, 2 = très zoomé)
        x: 50,            // position horizontale du centre du cadrage (en %)
        y: 12,            // position verticale du centre du cadrage (en %)
     },
      href: "#",
      details: {
      description: "Affiche pour la sortie d'album du groupe Lone Assembly. Un visuel pensé comme une porte d'entrée dans l'univers sonore du projet, à mi-chemin entre l'introspection et la poésie graphique.",
      descriptionEn: "Poster for the album release of the band Lone Assembly. A visual designed as a gateway into the project's sonic universe, somewhere between introspection and graphic poetry.",
      images: [
        "public/images/projects/loneassembly.webp",
        // Tu pourras en ajouter d'autres ici : déclinaisons, applications, mockups...
      ],
    },
  },

{
      title: "Pâques chez Deux Parts et d'Autres",
      titleEn: "Easter at Deux Parts et d'Autres",
      cat: "Illustration",
      year: "2026",
      image: 'public/images/projects/deuxparts3.webp',
      crop: {
        zoom: 1.1,        // niveau de zoom (1 = image entière, 2 = très zoomé)
        x: 50,            // position horizontale du centre du cadrage (en %)
        y: 50,            // position verticale du centre du cadrage (en %)
     },
      href: "#",
      details: {
      description: "Décor de Pâques illustré pour la pâtisserie Deux Parts et d'Autres à Veigy. Un univers tendre et printanier pensé pour habiller la vitrine et accompagner les gourmandises de saison.",
      descriptionEn: "Easter window display illustration for the Deux Parts et d'Autres pastry shop in Veigy. A tender, springy universe designed to dress the storefront and complement the seasonal treats.",
      images: [
        "public/images/projects/deuxparts1.webp",
        "public/images/projects/deuxparts2.webp",
        // Tu pourras en ajouter d'autres ici : déclinaisons, applications, mockups...
      ],
    },
  },

{
      title: "Décor pour Bzopse",
      titleEn: "Bzopse Background",
      cat: "Illustration",
      year: "2025",
      image: 'public/images/projects/filleforet2.webp',
      crop: {
        zoom: 1.1,        // niveau de zoom (1 = image entière, 2 = très zoomé)
        x: 50,            // position horizontale du centre du cadrage (en %)
        y: 50,            // position verticale du centre du cadrage (en %)
     },
      href: "#",
      details: {
      description: "Décor de scène pour un spectacle de clown jeune public sur le thème de l'écologie. Le défi : créer un environnement immersif qui dialogue avec le jeu de l'artiste et porte le message sans jamais l'alourdir.",
      descriptionEn: "Stage backdrop for a children's clown show on the theme of ecology. The challenge: build an immersive environment that supports the performer's act and carries the message without ever weighing it down.",
      images: [
        "public/images/projects/filleforet1.webp",
        // Tu pourras en ajouter d'autres ici : déclinaisons, applications, mockups...
      ],
    },
  },

  {
      title: "Identité visuelle pour La Sargane",
      titleEn: "La Sargane Identity",
      cat: "Identity",
      year: "2025",
      image: 'public/images/projects/sargane1.webp',
      crop: {
        zoom: 1.1,        // niveau de zoom (1 = image entière, 2 = très zoomé)
        x: 50,            // position horizontale du centre du cadrage (en %)
        y: 50,            // position verticale du centre du cadrage (en %)
     },
      href: "#",
      details: {
      description: "Identité visuelle complète pour La Sargane, pâtisserie et salon de thé. Un univers graphique chaleureux pensé pour refléter la générosité et le caractère artisanal du lieu, du logo à la signalétique.",
      descriptionEn: "Full visual identity for La Sargane, a pastry shop and tea room. A warm graphic universe designed to reflect the place's generosity and craftsmanship, from logo to in-store signage.",
      images: [
        "public/images/projects/sargane2.webp",
        "public/images/projects/sargane3.webp",
        // Tu pourras en ajouter d'autres ici : déclinaisons, applications, mockups...
      ],
    },
  },

    {
      title: "Logo pour Lunawave Retreats",
      titleEn: "Lunawave Retreats Logo",
      cat: "Identity",
      year: "2026",
      image: 'public/images/projects/lunawave.svg',
      crop: {
        zoom: 1.4,        // niveau de zoom (1 = image entière, 2 = très zoomé)
        x: 50,            // position horizontale du centre du cadrage (en %)
        y: 27,            // position verticale du centre du cadrage (en %)
     },
      href: "#",
      details: {
      description: "Identité visuelle pour Lunawave Retreats, un projet de retraites bien-être au bord de l'eau. Le logo associe la lune et la vague pour évoquer le cycle naturel et la sérénité.",
      descriptionEn: "Visual identity for Lunawave Retreats, a wellness retreat project by the water. The logo combines the moon and the wave to evoke natural cycles and serenity.",
      images: [
        "public/images/projects/lunawave.svg",
        // Tu pourras en ajouter d'autres ici : déclinaisons, applications, mockups...
      ],
    },
  },
    
    {
      title: "Affiche Parade d'Halloween des Corgis",
      titleEn: "Corgi Parade Poster",
      cat: "Print",
      year: "2025",
      image: "public/images/projects/corgi.svg",
      crop: {
        zoom: 1.4,        // niveau de zoom (1 = image entière, 2 = très zoomé)
        x: 50,            // position horizontale du centre du cadrage (en %)
        y: 2,            // position verticale du centre du cadrage (en %)
     },
      href: "#",
      details: {
      description: "Affiche réalisée pour la parade d'Halloween de Corgis Geneva. L'idée : marier l'esthétique vintage du poster d'horreur classique avec la bouille irrésistible des corgis pour un résultat qui fait sourire avant de faire peur.",
      descriptionEn: "Poster for the Corgis Geneva Halloween parade. The idea: blend classic vintage horror poster aesthetics with the irresistible faces of corgis for a result that makes you smile before it scares you.",
      images: [
        "public/images/projects/corgi.svg",
        // Tu pourras en ajouter d'autres ici : déclinaisons, applications, mockups...
      ],
    },
    },

    {
      title: "Affiche de La Petite Sirène",
      titleEn: "La Petite Sirène Poster",
      cat: "Print",
      year: "2026",
      image: "public/images/projects/petitesirene.webp",
      crop: {
        zoom: 1.4,        // niveau de zoom (1 = image entière, 2 = très zoomé)
        x: 45,            // position horizontale du centre du cadrage (en %)
        y: 80,            // position verticale du centre du cadrage (en %)
     },
      href: "#",
      details: {
      description: "Affiche réalisée pour le spectacle La Petite Sirène des Ateliers Buissoniers. Un visuel pensé pour intriguer le passant et donner envie de plonger, au sens propre comme au figuré.",
      descriptionEn: "Poster for La Petite Sirène, a show by Les Ateliers Buissoniers. A visual designed to intrigue passersby and make them want to dive in, both literally and figuratively.",
      images: [
        "public/images/projects/petitesirene.webp",
        // Tu pourras en ajouter d'autres ici : déclinaisons, applications, mockups...
      ],
    },
    },

    {
      title: "Affiche pour Le Petit Nicolas",
      titleEn: "Le Petit Nicolas Poster",
      cat: "Print",
      year: "2026",
      image: "public/images/projects/petitnicolas.webp",
      crop: {
        zoom: 1.4,        // niveau de zoom (1 = image entière, 2 = très zoomé)
        x: 50,            // position horizontale du centre du cadrage (en %)
        y: 10,            // position verticale du centre du cadrage (en %)
     },
      href: "#",
      details: {
      description: "Affiche réalisée pour le spectacle Le Petit Nicolas des Ateliers Buissoniers. Un clin d'œil à l'univers de Sempé tout en gardant l'identité graphique de la compagnie.",
      descriptionEn: "Poster for Le Petit Nicolas, a show by Les Ateliers Buissoniers. A nod to Sempé's universe while keeping the company's own graphic identity.",
      images: [
        "public/images/projects/petitnicolas.webp",
        // Tu pourras en ajouter d'autres ici : déclinaisons, applications, mockups...
      ],
    },
    },

    {
      title: "Memory apprentissage anglais",
      titleEn: "English Learning Memory",
      cat: "Illustration",
      year: "2026",
      image: "public/images/projects/memory.svg",
      crop: {
        zoom: 1,        // niveau de zoom (1 = image entière, 2 = très zoomé)
        x: 83,            // position horizontale du centre du cadrage (en %)
        y: 23,            // position verticale du centre du cadrage (en %)
     },
      href: "#",
      details: {
      description: "Petit jeu de memory imaginé pour accompagner l'apprentissage de l'anglais en maternelle. Des illustrations claires et lisibles, pensées pour que la reconnaissance des mots passe par le plaisir du jeu.",
      descriptionEn: "A small memory game designed to support English learning in preschool. Clear, readable illustrations crafted so that word recognition happens through the joy of play.",
      images: [
        "public/images/projects/memory.svg",
        // Tu pourras en ajouter d'autres ici : déclinaisons, applications, mockups...
      ],
    },
    },

    {
      title: "Site web de Jolan Chappaz",
      titleEn: "Jolan Chappaz Website",
      cat: "Web",
      year: "2026",
      image: "public/images/projects/jolan1.webp",
      crop: {
        zoom: 1.5,        // niveau de zoom (1 = image entière, 2 = très zoomé)
        x: 50,            // position horizontale du centre du cadrage (en %)
        y: 65,            // position verticale du centre du cadrage (en %)
     },
      href: "#",
      details: {
        description: "Site portfolio pour Jolan Chappaz, développé en JavaScript vanilla et déployé sur GitHub Pages. Un projet où chaque détail d'interaction a été pensé sur-mesure pour refléter sa pratique.",
        descriptionEn: "Portfolio website for Jolan Chappaz, built in vanilla JavaScript and deployed on GitHub Pages. A project where every interaction was tailored to reflect his practice.",
        images: [
        "public/video/jolan.webm",
        // Tu pourras en ajouter d'autres ici : déclinaisons, applications, mockups...
      ],
      },
    },

{
      title: "La Grenouille qui chill",
      titleEn: "Chill Froggy",
      cat: "Illustration",
      year: "2025",
      image: "public/images/projects/chillfroggy2.webp",
            crop: {
        zoom: 1.1,        // niveau de zoom (1 = image entière, 2 = très zoomé)
        x: 50,            // position horizontale du centre du cadrage (en %)
        y: 50,            // position verticale du centre du cadrage (en %)
     },
      href: "#",
      details: {
      description: "Peinture acrylique autour du thème de la nature et de l'isolement. Une grenouille en pause, perdue dans ses pensées, comme un petit moment suspendu.",
      descriptionEn: "Acrylic painting on the theme of nature and isolation. A frog on a break, lost in thought — a small suspended moment.",
      images: [
        "public/images/projects/chillfroggy.webp",
        // Tu pourras en ajouter d'autres ici : déclinaisons, applications, mockups...
      ],
    },
    },

{
      title: "La Fille du Lac",
      titleEn: "Lake Girl",
      cat: "Illustration",
      year: "2025",
      image: "public/images/projects/filledulac2.webp",
            crop: {
        zoom: 1.1,        // niveau de zoom (1 = image entière, 2 = très zoomé)
        x: 50,            // position horizontale du centre du cadrage (en %)
        y: 50,            // position verticale du centre du cadrage (en %)
     },
      href: "#",
      details: {
      description: "Peinture acrylique autour du thème de la nature et de l'isolement. Une silhouette face au lac, dans cet instant tranquille où le paysage prend toute la place.",
      descriptionEn: "Acrylic painting on the theme of nature and isolation. A silhouette facing the lake, in that quiet moment where the landscape takes over.",
      images: [
        "public/images/projects/filledulac.webp",
        // Tu pourras en ajouter d'autres ici : déclinaisons, applications, mockups...
      ],
    },
    },

    {
      title: "Retraite en Forêt",
      titleEn: "Forest Retreat",
      cat: "Illustration",
      year: "2025",
      image: "public/images/projects/forestretreat.webp",
            crop: {
        zoom: 1.9,        // niveau de zoom (1 = image entière, 2 = très zoomé)
        x: 52,            // position horizontale du centre du cadrage (en %)
        y: 70,            // position verticale du centre du cadrage (en %)
     },
      href: "#",
      details: {
      description: "Peinture acrylique autour du thème de la nature et de l'isolement. Une retraite en forêt, où le silence et la lumière filtrée se chargent de tout dire.",
      descriptionEn: "Acrylic painting on the theme of nature and isolation. A forest retreat where silence and filtered light say everything that needs to be said.",
      images: [
        "public/images/projects/forestretreat.webp",
        // Tu pourras en ajouter d'autres ici : déclinaisons, applications, mockups...
      ],
    },
    },

  ],

  // ── Page About ────────────────────────────────────────────
  // suffix    : petit texte affiché à droite du nom dans la nav (ex. "is a team")
  // image     : chemin de l'image à gauche (ou "" pour ne rien afficher)
  // paragraphs: tableau de paragraphes. HTML autorisé pour mettre en gras avec <strong>
  about: {
  suffix: "graphiste & illustrateur",
  suffixEn: "is a designer",
  image: "public/images/portrait.webp",
  paragraphs: [
    "<strong>Je suis Thibaud Pagès</strong>",
    "Graphiste et illustrateur indépendant basé sur le bassin lémanique. J'accompagne des entreprises, des marques et des porteurs de projets de tous horizons, que ce soit en France, en Suisse ou à l'international.",
    "Nourri par une passion de toujours pour la bande dessinée et l'image sous toutes ses formes, j'envisage le graphisme comme <strong>un terrain d'échange.</strong> J'aime prendre le temps de discuter avec vous pour cerner l'essence de votre projet et concevoir l'univers visuel qui vous correspondra le mieux. Pour moi, cette démarche collaborative est essentielle : elle vous garantit un résultat unique et sur-mesure, tout en me permettant d'enrichir mes propres compétences et d'élargir ma vision artistique.",
    "<strong>De l'échange à l'image : créons ensemble votre univers.</strong>",
  ],
  paragraphsEn: [
    "<strong>I'm Thibaud Pagès</strong>",
    "Independent graphic designer and illustrator based in the Lake Geneva area. I work with businesses, brands, and project leaders from all backgrounds, whether in France, Switzerland, or internationally.",
    "Driven by a lifelong passion for comics and visual storytelling, I see graphic design as <strong>a space for exchange.</strong> I take the time to discuss with you, understand the essence of your project, and craft the visual universe that fits you best. For me, this collaborative approach is essential: it guarantees you a unique, tailor-made result, while letting me enrich my own skills and broaden my artistic vision.",
    "<strong>From conversation to image: let's create your universe together.</strong>",
  ],
},

  // ── Page Contact ──────────────────────────────────────────
  // suffix      : petit texte à droite du nom dans la nav
  // headline    : grande question principale (HTML autorisé pour <em>)
  // sections    : tableau de sections email avec un titre et un mailto
  contact: {
    suffix: "discutons-en",
    suffixEn: "is open to talk",
    headline: "Un projet&nbsp;? Une idée&nbsp;?<br><em>Besoin d'une nouvelle identité&nbsp;?</em>",
    headlineEn: "A project? An idea?<br><em>Need a new identity?</em>",
    sections: [
  {
    title: "TRAVAILLONS ENSEMBLE",
    titleEn: "LET'S COLLABORATE",
    email: "thibaudpages@yahoo.fr",
  },
  {
    title: "Dites bonjour et suivez mon actualité",
    titleEn: "Just say hi and see my latest news",
    link: "https://www.instagram.com/thibaudpagesdesigns/",
    linkLabel: "@thibaudpagesdesigns",
  },
],
  },

  // ── Palettes (pot de peinture) ────────────────────────────
  themes: [
    {
      label: "Blanc",
      swatch: "#ffffff",
      bg: "#ffffff",
      fg: "#1a1a1a",
      border: "#e0e0e0",
      mid: "#888888",
      card: "#f5f5f5",
      
    },
    {
      label: "Crème",
      swatch: "#FFFDF2",
      bg: "#FFFDF2",
      fg: "#2A2A24",
      border: "#D8D0C0",
      mid: "#8A8678",
      card: "#EDE8DC",
      defaultLight: true,
    },
    {
      label: "Encre",
      swatch: "#2A2A24",
      bg: "#2A2A24",
      fg: "#F5F0E8",
      border: "#444438",
      mid: "#9A9A88",
      card: "#3A3A30",
      defaultDark: true,
    },
    {
      label: "Sauge",
      swatch: "#E8EDE4",
      bg: "#E8EDE4",
      fg: "#2A3424",
      border: "#C8D4C0",
      mid: "#728060",
      card: "#DDE5D8",
    },
    {
      label: "Nuit",
      swatch: "#1C2B3A",
      bg: "#1C2B3A",
      fg: "#E8F0F8",
      border: "#2E4258",
      mid: "#7A9AB8",
      card: "#243444",
    },
  ],
};