// Smooth scroll untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fungsi untuk scroll ke bagian Projects
function scrollToProjects() {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
}

// Animasi progress bar pada bagian Skills
document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent + '%';
    });
});

// Filter untuk bagian Projects
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-grid .project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Hapus class active dari semua tombol
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Tambahkan class active ke tombol yang diklik
            this.classList.add('active');

            // Filter proyek
            projectItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Validasi sederhana
    if (name && email && subject && message) {
        alert('Terima kasih, ' + name + '! Pesan Anda telah terkirim.');
        // Reset form
        event.target.reset();
    } else {
        alert('Harap isi semua field.');
    }
}

// Animasi teks ketik pada bagian Hero
document.addEventListener('DOMContentLoaded', function() {
    const typedText = document.querySelector('.typed-text');
    const texts = ["Web Developer", "UI/UX Designer", "Creative Thinker"];
    let index = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < texts[index].length) {
            typedText.textContent += texts[index].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedText.textContent = texts[index].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            index++;
            if (index >= texts.length) index = 0;
            setTimeout(type, 500);
        }
    }

    if (texts.length) setTimeout(type, 1000);
});

// Tambahkan proyek secara dinamis ke dalam grid
document.addEventListener('DOMContentLoaded', function() {
    const projectGrid = document.querySelector('.project-grid');
    const projects = [
        { title: 'Web Project 1 - JS', category: 'web', image: 'images/pj1.png' },
        { title: 'App Project 1 - Dart', category: 'app', image: 'images/pj2.png' },
        { title: 'Design Project 1 - Figma', category: 'design', image: 'images/pj3.png' },
        { title: 'Web Project 2 - PHP', category: 'web', image: 'images/pj4.png' },
        { title: 'Design Project 2 - Figma', category: 'design', image: 'images/pj5.png' }
    ];

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card', project.category);
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
        `;
        projectGrid.appendChild(projectCard);
    });
});