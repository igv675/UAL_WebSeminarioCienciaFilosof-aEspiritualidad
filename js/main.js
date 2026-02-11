document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. INICIALIZACIÓN
    // ==========================================
    
    // Obtener idioma (o español por defecto)
    const currentLang = localStorage.getItem('selectedLang') || 'es';
    
    // A. Iniciar Reloj
    updateClock(); 
    setInterval(updateClock, 1000);

    // B. Footer Año
    const yearSpan = document.getElementById('year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    // C. Detectar página y cargar contenido
    if (document.getElementById('newsContainer')) {
        renderNews(newsData, currentLang); // Portada
    } else if (document.getElementById('newsBody')) {
        loadNewsDetail(currentLang); // Noticia Detalle
    }

    // D. Aplicar traducciones estáticas
    changeLanguage(currentLang);

    console.log("Sistema cargado: Seminario UAL v4.0 (Full Bilingüe)");
});

// ==========================================
// 2. BASE DE DATOS DE NOTICIAS (BILINGÜE)
// ==========================================
const newsData = [
    {
        id: 1,
        title: {
            es: "Inauguración del ciclo de conferencias 2026",
            en: "Opening of the 2026 Conference Cycle"
        },
        subtitle: {
            es: "Expertos internacionales visitan la UAL",
            en: "International experts visit UAL"
        },
        date: "2026-02-10",
        category: "Actualidad",
        content: {
            es: `
                <p>Nos complace anunciar el inicio del nuevo ciclo académico con una serie de conferencias magistrales. Este año contaremos con la presencia de filósofos y físicos de renombre internacional.</p>
                <p>El acto inaugural tendrá lugar en el Paraninfo de la Universidad y abordará los retos éticos de la inteligencia artificial desde una perspectiva espiritual.</p>
                <h4 class="mt-4">Detalles</h4>
                <ul><li><strong>Lugar:</strong> Paraninfo UAL</li><li><strong>Entrada:</strong> Gratuita.</li></ul>
            `,
            en: `
                <p>We are pleased to announce the start of the new academic cycle with a series of keynote lectures. This year we will have the presence of internationally renowned philosophers and physicists.</p>
                <p>The inaugural event will take place at the University Hall and will address the ethical challenges of artificial intelligence from a spiritual perspective.</p>
                <h4 class="mt-4">Details</h4>
                <ul><li><strong>Location:</strong> UAL Hall</li><li><strong>Entry:</strong> Free.</li></ul>
            `
        }
    },
    {
        id: 2,
        title: {
            es: "Publicación: Bioética y Consciencia",
            en: "Publication: Bioethics and Consciousness"
        },
        subtitle: {
            es: "Nuevo artículo en Journal of Consciousness Studies",
            en: "New paper in the Journal of Consciousness Studies"
        },
        date: "2026-02-05",
        category: "Publicación",
        content: {
            es: `<p>El equipo de investigación ha logrado publicar su último estudio sobre las implicaciones bioéticas en los estados alterados de consciencia.</p>`,
            en: `<p>The research team has successfully published their latest study on the bioethical implications of altered states of consciousness.</p>`
        }
    },
    {
        id: 3,
        title: {
            es: "Participación en el foro de Oxford",
            en: "Participation in the Oxford Forum"
        },
        subtitle: {
            es: "Representación internacional del seminario",
            en: "International representation of the seminar"
        },
        date: "2026-01-28",
        category: "Congreso",
        content: {
            es: `<p>La Universidad de Almería ha estado presente en el prestigioso foro "Science & Spirit" celebrado en Oxford.</p>`,
            en: `<p>The University of Almeria has been present at the prestigious "Science & Spirit" forum held in Oxford.</p>`
        }
    }
];

// ==========================================
// 3. DICCIONARIO DE TRADUCCIONES
// ==========================================
const translations = {
    es: {
        ual_sub: "Universidad de Almería",
        nav_home: "Inicio", nav_presentation: "Presentación", nav_news: "Noticias", nav_events: "Eventos",
        nav_objectives: "Objetivos", nav_research: "Investigación", nav_team: "Equipo", nav_contact: "Contacto",
        hero_title: "Seminario Permanente<br>“Ciencia, Filosofía y Espiritualidad”",
        hero_subtitle: "Un espacio de diálogo interdisciplinario para fomentar el pensamiento crítico.",
        btn_more: "Saber más",
        title_presentation: "Presentación",
        pres_lead: "Fomentando el debate entre visiones científicas y espirituales.",
        pres_text: "Este Seminario Permanente nace con el propósito de crear un puente de diálogo similar al de instituciones de prestigio mundial.",
        title_news: "Últimas Noticias", filter_search: "Buscar por palabra...", filter_cat: "Categoría",
        opt_all: "Todas", filter_date: "A partir de fecha", btn_filter: "Filtrar",
        title_events: "Próximos Eventos", event_1_title: "Mesa Redonda: Conciencia y Universo", btn_join: "Inscribirse",
        title_objectives: "Objetivos",
        obj_main: "Crear un espacio de diálogo y reflexión sobre las relaciones entre ciencia, filosofía y espiritualidad.",
        title_lines: "Líneas de Investigación",
        line_1: "Ciencia y Espiritualidad", desc_1: "Conexiones ontológicas y epistemológicas.",
        line_2: "Visiones del Cosmos", desc_2: "La vida en nuestro planeta y el universo.",
        line_3: "Consciencia Humana", desc_3: "Evolución, desarrollo interior y psicología.",
        line_4: "Ecología Profunda", desc_4: "Sostenibilidad y consciencia ambiental.",
        line_5: "Filosofía Perenne", desc_5: "Tradiciones sapienciales y sabiduría antigua.",
        line_6: "Salud y Bienestar", desc_6: "Felicidad humana y terapias integrativas.",
        title_team: "Nuestro Equipo", role_director: "Director", role_codirector_f: "Codirectora",
        role_codirector_m: "Codirector", btn_profile: "Ver perfil", label_collab: "Entidad colaboradora:",
        footer_loc: "Ubicación", footer_links: "Enlaces de Interés", footer_legal: "Aviso Legal"
    },
    en: {
        ual_sub: "University of Almeria",
        nav_home: "Home", nav_presentation: "About", nav_news: "News", nav_events: "Events",
        nav_objectives: "Objectives", nav_research: "Research", nav_team: "Team", nav_contact: "Contact",
        hero_title: "Permanent Seminar<br>“Science, Philosophy and Spirituality”",
        hero_subtitle: "An interdisciplinary dialogue space to foster critical thinking.",
        btn_more: "Learn More",
        title_presentation: "About Us",
        pres_lead: "Fostering debate between scientific and spiritual visions.",
        pres_text: "This Permanent Seminar was born with the purpose of creating a bridge of dialogue similar to that of world-renowned institutions.",
        title_news: "Latest News", filter_search: "Search by keyword...", filter_cat: "Category",
        opt_all: "All", filter_date: "After date", btn_filter: "Filter",
        title_events: "Upcoming Events", event_1_title: "Round Table: Consciousness & Universe", btn_join: "Register",
        title_objectives: "Objectives",
        obj_main: "To create a space for dialogue and reflection on the relationships between science, philosophy and spirituality.",
        title_lines: "Research Lines",
        line_1: "Science & Spirituality", desc_1: "Ontological and epistemological connections.",
        line_2: "Cosmic Visions", desc_2: "Life on our planet and the universe.",
        line_3: "Human Consciousness", desc_3: "Evolution, inner development and psychology.",
        line_4: "Deep Ecology", desc_4: "Sustainability and environmental awareness.",
        line_5: "Perennial Philosophy", desc_5: "Sapiential traditions and ancient wisdom.",
        line_6: "Health & Well-being", desc_6: "Human happiness and integrative therapies.",
        title_team: "Our Team", role_director: "Director", role_codirector_f: "Co-director",
        role_codirector_m: "Co-director", btn_profile: "View profile", label_collab: "Collaborating entity:",
        footer_loc: "Location", footer_links: "Links of Interest", footer_legal: "Legal Notice"
    }
};

// ==========================================
// 4. FUNCIONES DE RELOJ (Multiidioma)
// ==========================================
function updateClock() {
    const clockElement = document.getElementById('clock');
    if(clockElement) {
        const now = new Date();
        const lang = localStorage.getItem('selectedLang') || 'es';
        const locale = lang === 'es' ? 'es-ES' : 'en-US'; // Determinar locale

        const dateOptions = { weekday: 'long', day: 'numeric', month: 'short' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

        const dateString = now.toLocaleDateString(locale, dateOptions);
        const timeString = now.toLocaleTimeString(locale, timeOptions);
        
        // Capitalizar solo si es español (en inglés no suele capitalizarse todo)
        let formattedDate = dateString;
        if(lang === 'es') {
            formattedDate = dateString.charAt(0).toUpperCase() + dateString.slice(1);
        }
        
        clockElement.textContent = `${formattedDate} - ${timeString}`;
    }
}

// ==========================================
// 5. RENDERIZADO DE NOTICIAS (Multiidioma)
// ==========================================
function renderNews(data, lang) {
    const container = document.getElementById('newsContainer');
    if (!container) return;
    container.innerHTML = ''; 

    if (data.length === 0) {
        container.innerHTML = '<div class="col-12 text-center text-muted py-4">No news found / No hay noticias.</div>';
        return;
    }

    const locale = lang === 'es' ? 'es-ES' : 'en-US';

    data.forEach(item => {
        const dateReadable = new Date(item.date).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
        
        // AQUÍ SELECCIONAMOS EL IDIOMA CORRECTO DEL OBJETO TITLE/SUBTITLE
        const titleText = item.title[lang];
        const subText = item.subtitle[lang];

        const html = `
            <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm news-card">
                    <div class="card-body">
                        <span class="badge bg-primary mb-2">${item.category}</span>
                        <h5 class="card-title fw-bold mt-2">${titleText}</h5>
                        <p class="card-text text-muted small">${subText}</p>
                        <a href="noticia.html?id=${item.id}" class="btn btn-outline-primary btn-sm mt-3 stretched-link">
                            ${lang === 'es' ? 'Leer completa' : 'Read more'}
                        </a>
                    </div>
                    <div class="card-footer bg-white border-0 text-muted small">
                        <i class="bi bi-calendar3"></i> ${dateReadable}
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

function filterNews() {
    const lang = localStorage.getItem('selectedLang') || 'es';
    const text = document.getElementById('searchInput').value.toLowerCase();
    const cat = document.getElementById('categorySelect').value;
    const dateVal = document.getElementById('dateInput').value;

    const filtered = newsData.filter(item => {
        // Buscar en ambos idiomas por si acaso
        const tEs = item.title.es.toLowerCase();
        const tEn = item.title.en.toLowerCase();
        
        const matchText = tEs.includes(text) || tEn.includes(text);
        const matchCat = cat === 'all' || item.category === cat;
        const matchDate = !dateVal || new Date(item.date) >= new Date(dateVal);

        return matchText && matchCat && matchDate;
    });

    renderNews(filtered, lang);
}

// ==========================================
// 6. DETALLE DE NOTICIA (Multiidioma)
// ==========================================
function loadNewsDetail(lang) {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const item = newsData.find(n => n.id === id);

    if (item) {
        const locale = lang === 'es' ? 'es-ES' : 'en-US';
        const dateReadable = new Date(item.date).toLocaleDateString(locale, { weekday:'long', day: 'numeric', month: 'long', year: 'numeric' });
        
        document.getElementById('newsCategory').textContent = item.category;
        
        // CARGAR TEXTOS SEGÚN IDIOMA
        document.getElementById('newsTitle').textContent = item.title[lang];
        document.getElementById('newsSubtitle').textContent = item.subtitle[lang];
        document.getElementById('newsBody').innerHTML = item.content[lang];
        
        document.getElementById('newsDate').textContent = dateReadable;
        document.title = item.title[lang] + " - UAL";
        
        // Configurar botones compartir (usando titulo en idioma actual)
        setupSocialShare(item.title[lang]);
    }
}

function setupSocialShare(title) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    const twBtn = document.getElementById('shareTwitter');
    if(twBtn) twBtn.href = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    // ... resto igual
}

// ==========================================
// 7. SISTEMA DE CAMBIO DE IDIOMA
// ==========================================
window.changeLanguage = function(lang) {
    localStorage.setItem('selectedLang', lang);

    // 1. Textos estáticos (HTML)
    if (translations[lang]) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });
    }

    // 2. Elementos Dinámicos (Noticias y Reloj)
    if (document.getElementById('newsContainer')) {
        renderNews(newsData, lang); // Repintar noticias en el nuevo idioma
    } else if (document.getElementById('newsBody')) {
        loadNewsDetail(lang); // Repintar detalle
    }
    
    updateClock(); // Actualizar formato de fecha inmediatamente

    // 3. Botones visuales
    const btns = document.querySelectorAll('.lang-switch button');
    btns.forEach(btn => btn.classList.remove('active'));
    if (lang === 'es' && btns[0]) btns[0].classList.add('active');
    if (lang === 'en' && btns[1]) btns[1].classList.add('active');
}

// ==========================================
// 8. SCROLL SPY
// ==========================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(section => {
        if (window.scrollY >= (section.offsetTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});