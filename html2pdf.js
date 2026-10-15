<html>
    <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    </head>
    <body>
        <!-- THE PORTFOLIO CONTENT (Wrapped in an ID so the script can target it) -->
    <div id="portfolio-document" class="max-w-4xl mx-auto bg-white p-10 shadow-lg rounded-sm">
        
        <!-- Header Section -->
        <header class="border-b-4 border-indigo-600 pb-6 mb-6">
            <h1 class="text-4xl font-extrabold text-slate-900"><%= locals.fullName || 'Student Developer' %></h1>
            <p class="text-xl text-indigo-600 mt-2"><%= locals.university || 'Gujarat Technological University (GTU)' %></p>
        </header>

        <!-- About / Bio Section -->
        <section class="mb-8">
            <h2 class="text-2xl font-bold text-slate-800 mb-3">About Me</h2>
            <p class="text-slate-600 leading-relaxed">
                <%= locals.bio || 'Passionate about software development, system architecture, and building creative web applications.' %>
            </p>
        </section>

        <!-- Academics Section -->
        <section class="mb-8">
            <h2 class="text-2xl font-bold text-slate-800 mb-3">Recent Coursework</h2>
            <ul class="list-disc list-inside text-slate-600 space-y-2">
                <li><%= locals.course1 || 'Computer Organization and Architecture' %></li>
                <li><%= locals.course2 || 'Environmental Science' %></li>
                <li><%= locals.course3 || 'Full-Stack Web Development' %></li>
            </ul>
        </section>

        <!-- Highlighted Projects Section -->
        <section>
            <h2 class="text-2xl font-bold text-slate-800 mb-3">Highlighted Projects</h2>
            
            <div class="space-y-4">
                <!-- Project 1 -->
                <div class="p-5 bg-slate-50 border border-slate-200 rounded-lg">
                    <h3 class="font-bold text-lg text-indigo-700"><%= locals.projectTitle || '5-Photo Birthday Grid Layout' %></h3>
                    <p class="text-slate-600 mt-1">Designed a precise CSS grid structure to perfectly frame and arrange five original photos for a digital birthday gift.</p>
                </div>

                <!-- Project 2 -->
                <div class="p-5 bg-slate-50 border border-slate-200 rounded-lg">
                    <h3 class="font-bold text-lg text-indigo-700">Student Portfolio Engine</h3>
                    <p class="text-slate-600 mt-1">A dynamic backend system serving customized template pages, built with Express and optimized EJS rendering.</p>
                </div>
            </div>
        </section>

    </div>
    </body>
</html>
const element = document.getElementById('portfolio-document');


