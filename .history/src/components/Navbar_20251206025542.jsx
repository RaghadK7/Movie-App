<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Joker - Cyberpunk Phantom</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        cyberpunk: {
                            pink: '#ff2a6d',
                            blue: '#05d9e8',
                            purple: '#d300c5',
                            yellow: '#f9f002',
                            dark: '#0d0221',
                        },
                        joker: {
                            green: '#2dcb70',
                            purple: '#6a0dad',
                        }
                    },
                    fontFamily: {
                        'cyber': ['"Rajdhani"', 'sans-serif'],
                        'joker': ['"Creepster"', 'cursive'],
                    },
                    animation: {
                        'glow': 'glow 2s ease-in-out infinite alternate',
                        'flicker': 'flicker 3s linear infinite',
                        'neon': 'neon 1.5s ease-in-out infinite alternate',
                    },
                    keyframes: {
                        glow: {
                            'from': { 'text-shadow': '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #05d9e8, 0 0 20px #05d9e8' },
                            'to': { 'text-shadow': '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #ff2a6d, 0 0 40px #ff2a6d' }
                        },
                        flicker: {
                            '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '1' },
                            '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.4' }
                        },
                        neon: {
                            'from': { 'box-shadow': '0 0 6px rgba(202, 228, 225, 0.92), 0 0 30px rgba(202, 228, 225, 0.34), 0 0 12px rgba(191, 226, 255, 0.52), 0 0 21px rgba(191, 226, 255, 0.92), 0 0 34px rgba(191, 226, 255, 0.78), 0 0 54px rgba(191, 226, 255, 0.92)' },
                            'to': { 'box-shadow': '0 0 6px rgba(202, 228, 225, 0.98), 0 0 30px rgba(202, 228, 225, 0.42), 0 0 12px rgba(191, 226, 255, 0.58), 0 0 22px rgba(191, 226, 255, 0.84), 0 0 38px rgba(191, 226, 255, 0.88), 0 0 60px rgba(210, 255, 255, 1)' }
                        }
                    }
                }
            }
        }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Creepster&display=swap" rel="stylesheet">
    <style type="text/tailwindcss">
        @layer utilities {
            .text-stroke {
                -webkit-text-stroke: 1px #05d9e8;
                text-stroke: 1px #05d9e8;
            }
            .text-stroke-thick {
                -webkit-text-stroke: 2px #ff2a6d;
                text-stroke: 2px #ff2a6d;
            }
            .grid-pattern {
                background-image: 
                    linear-gradient(rgba(5, 217, 232, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(5, 217, 232, 0.3) 1px, transparent 1px);
                background-size: 20px 20px;
            }
            .diagonal-pattern {
                background-image: 
                    linear-gradient(45deg, 
                    rgba(255, 42, 109, 0.1) 25%, 
                    transparent 25%, 
                    transparent 50%, 
                    rgba(255, 42, 109, 0.1) 50%, 
                    rgba(255, 42, 109, 0.1) 75%, 
                    transparent 75%, 
                    transparent);
                background-size: 10px 10px;
            }
            .clip-cyber {
                clip-path: polygon(
                    0% 0%, 100% 0%, 100% 75%, 
                    75% 75%, 75% 100%, 50% 75%, 
                    0% 75%
                );
            }
            .clip-joker {
                clip-path: polygon(
                    0% 0%, 100% 0%, 100% 80%, 
                    80% 80%, 80% 100%, 20% 80%, 
                    0% 80%
                );
            }
            .holographic-effect {
                background: linear-gradient(
                    135deg,
                    rgba(255, 42, 109, 0.7) 0%,
                    rgba(5, 217, 232, 0.7) 50%,
                    rgba(211, 0, 197, 0.7) 100%
                );
                backdrop-filter: blur(5px);
            }
        }
    </style>
</head>
<body class="bg-cyberpunk-dark text-white font-cyber overflow-x-hidden">
    <!-- Navbar -->
    <nav class="fixed w-full z-50 bg-opacity-90 backdrop-blur-md bg-cyberpunk-dark border-b border-cyberpunk-blue/30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <span class="text-2xl font-bold font-joker text-cyberpunk-pink animate-glow">JOKER</span>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <a href="#" class="px-3 py-2 rounded-md text-sm font-medium text-cyberpunk-blue hover:text-cyberpunk-pink transition-all duration-300 border-b-2 border-transparent hover:border-cyberpunk-yellow">Home</a>
                            <a href="#" class="px-3 py-2 rounded-md text-sm font-medium text-cyberpunk-blue hover:text-cyberpunk-pink transition-all duration-300 border-b-2 border-transparent hover:border-cyberpunk-yellow">Story</a>
                            <a href="#" class="px-3 py-2 rounded-md text-sm font-medium text-cyberpunk-blue hover:text-cyberpunk-pink transition-all duration-300 border-b-2 border-transparent hover:border-cyberpunk-yellow">Gallery</a>
                            <a href="#" class="px-3 py-2 rounded-md text-sm font-medium text-cyberpunk-blue hover:text-cyberpunk-pink transition-all duration-300 border-b-2 border-transparent hover:border-cyberpunk-yellow">Quotes</a>
                            <a href="#" class="px-3 py-2 rounded-md text-sm font-medium text-cyberpunk-blue hover:text-cyberpunk-pink transition-all duration-300 border-b-2 border-transparent hover:border-cyberpunk-yellow">Contact</a>
                        </div>
                    </div>
                </div>
                <div class="hidden md:block">
                    <div class="ml-4 flex items-center md:ml-6">
                        <button class="p-1 rounded-full text-cyberpunk-blue hover:text-cyberpunk-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyberpunk-dark focus:ring-cyberpunk-purple">
                            <span class="sr-only">View notifications</span>
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                        <button class="ml-3 px-4 py-2 bg-gradient-to-r from-cyberpunk-purple to-cyberpunk-pink text-xs font-bold rounded-full hover:from-cyberpunk-pink hover:to-cyberpunk-purple transition-all duration-500 transform hover:scale-105">
                            ENTER NIGHT CITY
                        </button>
                    </div>
                </div>
                <div class="-mr-2 flex md:hidden">
                    <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-cyberpunk-blue hover:text-cyberpunk-pink focus:outline-none">
                        <span class="sr-only">Open main menu</span>
                        <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative pt-24 pb-32 overflow-hidden">
        <!-- Grid background pattern -->
        <div class="absolute inset-0 grid-pattern diagonal-pattern opacity-20"></div>
        
        <!-- Glowing elements -->
        <div class="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-cyberpunk-pink opacity-20 blur-3xl"></div>
        <div class="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-cyberpunk-blue opacity-20 blur-3xl"></div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <!-- Text content -->
                <div class="space-y-8">
                    <h1 class="text-5xl md:text-7xl font-bold font-joker tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-pink via-cyberpunk-purple to-cyberpunk-blue animate-glow">
                        JOKER <span class="text-cyberpunk-yellow">2077</span>
                    </h1>
                    <p class="text-lg md:text-xl text-cyberpunk-blue/90 leading-relaxed">
                        In the neon-drenched streets of Night City, a new kind of madness emerges. 
                        <span class="font-bold text-cyberpunk-pink">The Joker</span> has arrived, 
                        blending the chaotic spirit of Gotham with the cybernetic future. 
                        No rules, no limits—just pure, unadulterated anarchy.
                    </p>
                    <div class="flex flex-wrap gap-4">
                        <button class="px-8 py-3 bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-purple rounded-full font-bold hover:from-cyberpunk-purple hover:to-cyberpunk-pink transition-all duration-500 transform hover:scale-105 shadow-lg shadow-cyberpunk-pink/30">
                            WITNESS CHAOS
                        </button>
                        <button class="px-8 py-3 border-2 border-cyberpunk-blue rounded-full font-bold text-cyberpunk-blue hover:bg-cyberpunk-blue/10 transition-all duration-300 hover:border-cyberpunk-yellow hover:text-cyberpunk-yellow">
                            LEARN MORE
                        </button>
                    </div>
                    <div class="pt-8">
                        <div class="flex items-center space-x-4">
                            <div class="h-0.5 w-16 bg-gradient-to-r from-cyberpunk-pink to-transparent"></div>
                            <span class="text-sm font-medium tracking-widest text-cyberpunk-blue">FEATURED IN</span>
                        </div>
                        <div class="flex flex-wrap items-center gap-8 pt-4">
                            <span class="text-2xl font-bold text-cyberpunk-yellow opacity-90 hover:opacity-100 cursor-pointer">CYBERPUNK</span>
                            <span class="text-2xl font-bold text-cyberpunk-pink opacity-90 hover:opacity-100 cursor-pointer">DC UNIVERSE</span>
                            <span class="text-2xl font-bold text-cyberpunk-blue opacity-90 hover:opacity-100 cursor-pointer">NIGHT CITY</span>
                        </div>
                    </div>
                </div>
                
                <!-- Image container -->
                <div class="relative">
                    <div class="absolute -inset-4 bg-gradient-to-tr from-cyberpunk-pink via-cyberpunk-purple to-cyberpunk-blue rounded-2xl opacity-70 blur-xl animate-rotate-colors"></div>
                    <div class="relative overflow-hidden rounded-xl border-2 border-cyberpunk-blue/50 clip-joker transform perspective-1000 rotate-y-6">
                        <img 
                            src="https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                            alt="Joker in Cyberpunk Style" 
                            class="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                        >
                        <div class="absolute inset-0 bg-gradient-to-t from-cyberpunk-dark/80 via-transparent to-transparent"></div>
                        <div class="absolute bottom-0 left-0 p-6">
                            <h3 class="text-2xl font-bold font-joker text-cyberpunk-yellow text-stroke-thick">"WHY SO CYBER?"</h3>
                            <p class="text-sm text-cyberpunk-blue/80 mt-1">- The Joker, Night City 2077</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Stats Section -->
    <div class="relative bg-cyberpunk-dark/80 border-t border-b border-cyberpunk-blue/20 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div class="text-center">
                    <div class="text-4xl font-bold font-joker text-cyberpunk-pink mb-2">100%</div>
                    <div class="text-sm uppercase tracking-widest text-cyberpunk-blue">CHAOS</div>
                </div>
                <div class="text-center">
                    <div class="text-4xl font-bold font-joker text-cyberpunk-yellow mb-2">∞</div>
                    <div class="text-sm uppercase tracking-widest text-cyberpunk-blue">LAUGHS</div>
                </div>
                <div class="text-center">
                    <div class="text-4xl font-bold font-joker text-cyberpunk-blue mb-2">2077</div>
                    <div class="text-sm uppercase tracking-widest text-cyberpunk-blue">YEAR</div>
                </div>
                <div class="text-center">
                    <div class="text-4xl font-bold font-joker text-cyberpunk-purple mb-2">0</div>
                    <div class="text-sm uppercase tracking-widest text-cyberpunk-blue">RULES</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-cyberpunk-dark/90 border-t border-cyberpunk-blue/10 py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="flex items-center space-x-4">
                    <span class="text-xl font-joker text-cyberpunk-pink animate-flicker">JOKER</span>
                    <span class="text-xs text-cyberpunk-blue/50">© 2077 NIGHT CITY ENTERTAINMENT</span>
                </div>
                <div class="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" class="text-cyberpunk-blue hover:text-cyberpunk-pink transition-colors duration-300">
                        <span class="sr-only">Twitter</span>
                        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                    </a>
                    <a href="#" class="text-cyberpunk-blue hover:text-cyberpunk-pink transition-colors duration-300">
                        <span class="sr-only">Instagram</span>
                        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
                        </svg>
                    </a>
                    <a href="#" class="text-cyberpunk-blue hover:text-cyberpunk-pink transition-colors duration-300">
                        <span class="sr-only">GitHub</span>
                        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>