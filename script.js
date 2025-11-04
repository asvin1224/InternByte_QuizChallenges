// BrainQuest - Interactive Quiz Application
class QuizApp {
    constructor() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedDifficulty = 'easy';
        this.userAnswers = [];
        this.questions = [];
        this.correctAnswersCount = 0;
        this.answerSelected = false;
        this.currentFeedback = null;
        
        this.initializeEventListeners();
        this.generateQuestions();
    }

    initializeEventListeners() {
        // Start screen events
        document.getElementById('start-btn').addEventListener('click', () => this.startQuiz());
        
        // Difficulty selection
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectDifficulty(e.target.dataset.difficulty));
        });
        
        // Quiz navigation
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        
        // Results screen events
        document.getElementById('play-again-btn').addEventListener('click', () => this.restartQuiz());
        document.getElementById('share-btn').addEventListener('click', () => this.shareScore());
    }

    generateQuestions() {
        const questionSets = {
            easy: [
                {
                    question: "What does 'JVM' stand for in Java?",
                    options: ["Java Virtual Machine", "Java Version Manager", "Java Variable Method", "Java Vital Memory"],
                    correct: 0,
                    explanation: "JVM stands for Java Virtual Machine, which executes Java bytecode."
                },
                {
                    question: "Which keyword is used to create a class in Java?",
                    options: ["create", "class", "new", "define"],
                    correct: 1,
                    explanation: "The 'class' keyword is used to define a class in Java."
                },
                {
                    question: "What is the main method signature in Java?",
                    options: ["public main(String[] args)", "static void main(String[] args)", "public static void main(String[] args)", "public static main(String args)"],
                    correct: 2,
                    explanation: "The correct main method signature is 'public static void main(String[] args)'."
                },
                {
                    question: "Which company originally developed Java?",
                    options: ["Microsoft", "Sun Microsystems", "Google", "Apple"],
                    correct: 1,
                    explanation: "Java was originally developed by Sun Microsystems (now owned by Oracle)."
                },
                {
                    question: "What is HTML used for?",
                    options: ["Database management", "Creating web pages", "Programming games", "Network security"],
                    correct: 1,
                    explanation: "HTML (HyperText Markup Language) is used for creating web pages."
                },
                {
                    question: "Which of these is a primitive data type in Java?",
                    options: ["String", "Array", "int", "Object"],
                    correct: 2,
                    explanation: "'int' is a primitive data type in Java for storing integers."
                },
                {
                    question: "What does 'WWW' stand for?",
                    options: ["World Wide Web", "World Web Width", "Wide World Web", "Web World Wide"],
                    correct: 0,
                    explanation: "WWW stands for World Wide Web."
                },
                {
                    question: "Which symbol is used for single-line comments in Java?",
                    options: ["#", "/*", "//", "<!--"],
                    correct: 2,
                    explanation: "// is used for single-line comments in Java."
                },
                {
                    question: "What is the extension of Java source files?",
                    options: [".java", ".class", ".jar", ".jvm"],
                    correct: 0,
                    explanation: "Java source files have the .java extension."
                },
                {
                    question: "Which keyword is used to inherit a class in Java?",
                    options: ["inherits", "extends", "implements", "super"],
                    correct: 1,
                    explanation: "The 'extends' keyword is used for class inheritance in Java."
                }
            ],
            medium: [
                {
                    question: "What is the difference between '==' and '.equals()' in Java?",
                    options: ["No difference", "== compares references, .equals() compares content", "== compares content, .equals() compares references", "Both compare only references"],
                    correct: 1,
                    explanation: "== compares object references, while .equals() compares the actual content of objects."
                },
                {
                    question: "Which collection class is synchronized in Java?",
                    options: ["ArrayList", "HashMap", "Vector", "LinkedList"],
                    correct: 2,
                    explanation: "Vector is synchronized in Java, making it thread-safe unlike ArrayList."
                },
                {
                    question: "What is the purpose of the 'final' keyword in Java?",
                    options: ["To create constants", "To prevent inheritance", "To prevent method overriding", "All of the above"],
                    correct: 3,
                    explanation: "The 'final' keyword can create constants, prevent inheritance, and prevent method overriding."
                },
                {
                    question: "Which HTTP status code indicates 'Not Found'?",
                    options: ["200", "404", "500", "301"],
                    correct: 1,
                    explanation: "HTTP status code 404 indicates that the requested resource was not found."
                },
                {
                    question: "What is polymorphism in Java?",
                    options: ["Having multiple constructors", "Method overloading only", "Ability of objects to take multiple forms", "Using multiple inheritance"],
                    correct: 2,
                    explanation: "Polymorphism allows objects to take multiple forms and behave differently based on their actual type."
                },
                {
                    question: "Which design pattern ensures only one instance of a class?",
                    options: ["Factory", "Observer", "Singleton", "Strategy"],
                    correct: 2,
                    explanation: "The Singleton pattern ensures that only one instance of a class is created."
                },
                {
                    question: "What does 'REST' stand for in web services?",
                    options: ["Remote Electronic State Transfer", "Representational State Transfer", "Reliable System Transfer", "Resource State Transmission"],
                    correct: 1,
                    explanation: "REST stands for Representational State Transfer, an architectural style for web services."
                },
                {
                    question: "Which Java keyword is used to handle exceptions?",
                    options: ["catch", "handle", "exception", "error"],
                    correct: 0,
                    explanation: "The 'catch' keyword is used along with 'try' to handle exceptions in Java."
                },
                {
                    question: "What is the time complexity of HashMap get() operation?",
                    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
                    correct: 0,
                    explanation: "HashMap get() operation has O(1) average time complexity due to its hash-based implementation."
                },
                {
                    question: "Which database management system is open source?",
                    options: ["Oracle", "SQL Server", "MySQL", "DB2"],
                    correct: 2,
                    explanation: "MySQL is an open-source relational database management system."
                }
            ],
            hard: [
                {
                    question: "What is the Java Memory Model's happens-before relationship?",
                    options: [
                        "A rule ensuring thread safety in concurrent programming",
                        "Memory allocation order in heap",
                        "Method execution sequence",
                        "Class loading hierarchy"
                    ],
                    correct: 0,
                    explanation: "The happens-before relationship ensures memory visibility and ordering in concurrent Java programs."
                },
                {
                    question: "Which garbage collector is best for low-latency applications in Java?",
                    options: ["Serial GC", "Parallel GC", "G1GC", "ZGC"],
                    correct: 3,
                    explanation: "ZGC (Z Garbage Collector) is designed for ultra-low latency applications with predictable pause times."
                },
                {
                    question: "What is the time complexity of QuickSort in the worst case?",
                    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
                    correct: 2,
                    explanation: "QuickSort has O(n²) time complexity in the worst case when the pivot is always the smallest or largest element."
                },
                {
                    question: "In microservices architecture, what is the Circuit Breaker pattern used for?",
                    options: ["Load balancing", "Data encryption", "Preventing cascade failures", "API versioning"],
                    correct: 2,
                    explanation: "The Circuit Breaker pattern prevents cascade failures by stopping calls to failing services temporarily."
                },
                {
                    question: "What is the purpose of the volatile keyword in Java?",
                    options: ["Memory optimization", "Exception handling", "Thread synchronization", "Ensuring visibility of variables across threads"],
                    correct: 3,
                    explanation: "The volatile keyword ensures that changes to a variable are immediately visible to all threads."
                },
                {
                    question: "Which CAP theorem constraint does MongoDB primarily sacrifice?",
                    options: ["Consistency", "Availability", "Partition tolerance", "None of the above"],
                    correct: 0,
                    explanation: "MongoDB typically sacrifices strong consistency in favor of availability and partition tolerance."
                },
                {
                    question: "What is the difference between checked and unchecked exceptions in Java?",
                    options: [
                        "Checked exceptions occur at runtime, unchecked at compile time",
                        "Checked must be handled at compile time, unchecked are optional",
                        "No difference in functionality",
                        "Checked are faster than unchecked"
                    ],
                    correct: 1,
                    explanation: "Checked exceptions must be handled or declared at compile time, while unchecked exceptions are optional to handle."
                },
                {
                    question: "In Spring Framework, what is the purpose of @Transactional annotation?",
                    options: ["Data validation", "Dependency injection", "Database transaction management", "REST API creation"],
                    correct: 2,
                    explanation: "@Transactional manages database transactions declaratively, handling commit/rollback operations."
                },
                {
                    question: "What is the primary advantage of using CompletableFuture over Future in Java?",
                    options: [
                        "Better memory usage",
                        "Composable and non-blocking operations",
                        "Faster execution",
                        "Simpler syntax"
                    ],
                    correct: 1,
                    explanation: "CompletableFuture allows composable, non-blocking asynchronous operations with better chaining capabilities."
                },
                {
                    question: "In distributed systems, what does 'eventual consistency' mean?",
                    options: [
                        "Data is always consistent immediately",
                        "System will become consistent over time without intervention",
                        "Consistency is not guaranteed",
                        "Manual intervention is required for consistency"
                    ],
                    correct: 1,
                    explanation: "Eventual consistency means the system will become consistent over time once updates stop, without requiring immediate consistency."
                }
            ]
        };

        this.questions = questionSets[this.selectedDifficulty];
        this.shuffleArray(this.questions);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectDifficulty(difficulty) {
        // Remove active class from all buttons
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to selected button
        event.target.classList.add('active');
        
        this.selectedDifficulty = difficulty;
        this.generateQuestions();
    }

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswersCount = 0;
        this.userAnswers = [];
        
        this.showScreen('quiz-screen');
        this.updateProgress();
        this.loadQuestion();
        
        // Add entrance animations
        setTimeout(() => {
            document.querySelector('.progress-section').classList.add('slide-in-left');
            document.querySelector('.question-card').classList.add('fade-in-up');
            document.querySelector('.answers-grid').classList.add('slide-in-right');
        }, 100);
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show selected screen
        document.getElementById(screenId).classList.add('active');
    }

    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
        document.getElementById('total-questions').textContent = this.questions.length;
    }

    loadQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.endQuiz();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        
        // Update question text with fade animation
        const questionElement = document.getElementById('question-text');
        questionElement.style.opacity = '0';
        
        setTimeout(() => {
            questionElement.textContent = question.question;
            questionElement.style.opacity = '1';
        }, 200);

        // Load answer options
        this.loadAnswerOptions(question);
        
        // Reset answer selection flag
        this.answerSelected = false;
        
        // Disable next button until answer is selected
        document.getElementById('next-btn').disabled = true;
    }

    loadAnswerOptions(question) {
        const answersGrid = document.getElementById('answers-grid');
        answersGrid.innerHTML = '';

        question.options.forEach((option, index) => {
            const answerElement = document.createElement('div');
            answerElement.className = 'answer-option';
            answerElement.textContent = option;
            answerElement.dataset.index = index;
            
            answerElement.addEventListener('click', () => {
                if (!this.answerSelected) {
                    this.selectAnswer(index);
                }
            });
            
            // Add staggered animation
            answerElement.style.animationDelay = `${index * 0.1}s`;
            answerElement.classList.add('fade-in-up');
            
            answersGrid.appendChild(answerElement);
        });
    }

    selectAnswer(selectedIndex) {
        // Prevent multiple selections
        if (this.answerSelected) {
            return;
        }
        
        this.answerSelected = true;

        // Remove selection from all options
        document.querySelectorAll('.answer-option').forEach(option => {
            option.classList.remove('selected', 'correct', 'wrong');
        });

        // Mark selected answer
        const selectedOption = document.querySelector(`[data-index="${selectedIndex}"]`);
        selectedOption.classList.add('selected');

        // Store answer
        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = selectedIndex === question.correct;
        
        this.userAnswers.push({
            questionIndex: this.currentQuestionIndex,
            selectedAnswer: selectedIndex,
            correctAnswer: question.correct,
            isCorrect: isCorrect
        });

        if (isCorrect) {
            this.correctAnswersCount++;
            const points = this.getPointsForDifficulty();
            this.score += points;
            this.updateScore();
            
            // Show correct animation
            selectedOption.classList.add('correct');
            this.showFeedback('Correct! +' + points + ' points', 'success');
        } else {
            // Show wrong answer and correct answer
            selectedOption.classList.add('wrong');
            document.querySelector(`[data-index="${question.correct}"]`).classList.add('correct');
            this.showFeedback('Wrong! The correct answer was: ' + question.options[question.correct], 'error');
        }

        // Enable next button
        document.getElementById('next-btn').disabled = false;
        
        // Update button text based on quiz progress
        if (this.currentQuestionIndex < this.questions.length - 1) {
            document.getElementById('next-btn').innerHTML = 'Next Question <i class="fas fa-arrow-right"></i>';
        } else {
            document.getElementById('next-btn').innerHTML = '<i class="fas fa-chart-bar"></i> View Results';
        }
    }

    getPointsForDifficulty() {
        switch (this.selectedDifficulty) {
            case 'easy': return 10;
            case 'medium': return 15;
            case 'hard': return 20;
            default: return 10;
        }
    }

    showFeedback(message, type) {
        // Remove any existing feedback first
        if (this.currentFeedback) {
            try {
                document.body.removeChild(this.currentFeedback);
            } catch (e) {
                // Feedback already removed
            }
            this.currentFeedback = null;
        }

        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = `feedback ${type}`;
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: ${type === 'success' ? 'var(--success)' : 'var(--danger)'};
            color: white;
            padding: 1rem 2rem;
            border-radius: var(--radius-lg);
            font-weight: 600;
            z-index: 1000;
            animation: fadeInUp 0.3s ease-out;
            box-shadow: var(--shadow-xl);
        `;

        this.currentFeedback = feedback;
        document.body.appendChild(feedback);

        // Remove feedback after 1.5 seconds
        setTimeout(() => {
            if (this.currentFeedback === feedback) {
                feedback.style.animation = 'fadeOut 0.3s ease-out forwards';
                setTimeout(() => {
                    try {
                        if (feedback.parentNode) {
                            document.body.removeChild(feedback);
                        }
                        if (this.currentFeedback === feedback) {
                            this.currentFeedback = null;
                        }
                    } catch (e) {
                        // Feedback already removed
                    }
                }, 300);
            }
        }, 1500);
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex >= this.questions.length) {
            this.endQuiz();
            return;
        }
        
        this.updateProgress();
        this.loadQuestion();
        
        // Add transition animation
        document.querySelector('.question-card').style.transform = 'translateX(-100%)';
        document.querySelector('.answers-grid').style.transform = 'translateX(-100%)';
        
        setTimeout(() => {
            document.querySelector('.question-card').style.transform = 'translateX(100%)';
            document.querySelector('.answers-grid').style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                document.querySelector('.question-card').style.transform = 'translateX(0)';
                document.querySelector('.answers-grid').style.transform = 'translateX(0)';
            }, 50);
        }, 200);
    }


    updateScore() {
        document.getElementById('score').textContent = this.score;
        
        // Add score animation
        const scoreElement = document.getElementById('score');
        scoreElement.style.animation = 'bounce 0.5s ease-in-out';
        setTimeout(() => {
            scoreElement.style.animation = '';
        }, 500);
    }

    endQuiz() {
        this.showScreen('results-screen');
        this.displayResults();
        
        // Add celebration animation
        setTimeout(() => {
            document.querySelector('.results-content').classList.add('fade-in-up');
        }, 100);
    }

    displayResults() {
        const maxScore = this.questions.length * this.getPointsForDifficulty();
        const accuracy = Math.round((this.correctAnswersCount / this.questions.length) * 100);
        const wrongAnswers = this.questions.length - this.correctAnswersCount;
        
        // Update result values with animation
        this.animateNumber('final-score', 0, this.score, 1000);
        this.animateNumber('correct-answers', 0, this.correctAnswersCount, 800);
        this.animateNumber('wrong-answers', 0, wrongAnswers, 800);
        this.animateNumber('accuracy', 0, accuracy, 1000, '%');
        
        document.getElementById('max-score').textContent = maxScore;
        
        // Update results message and icon based on performance
        const resultsIcon = document.getElementById('results-icon');
        const resultsTitle = document.getElementById('results-title');
        const resultsMessage = document.getElementById('results-message');
        
        if (accuracy >= 90) {
            resultsIcon.innerHTML = '<i class="fas fa-trophy"></i>';
            resultsTitle.textContent = 'Outstanding!';
            resultsMessage.textContent = 'Excellent work! You\'re a true quiz master!';
        } else if (accuracy >= 70) {
            resultsIcon.innerHTML = '<i class="fas fa-medal"></i>';
            resultsTitle.textContent = 'Great Job!';
            resultsMessage.textContent = 'Well done! You have a good grasp of the material.';
        } else if (accuracy >= 50) {
            resultsIcon.innerHTML = '<i class="fas fa-thumbs-up"></i>';
            resultsTitle.textContent = 'Good Effort!';
            resultsMessage.textContent = 'Not bad! Keep practicing to improve your score.';
        } else {
            resultsIcon.innerHTML = '<i class="fas fa-graduation-cap"></i>';
            resultsTitle.textContent = 'Keep Learning!';
            resultsMessage.textContent = 'Don\'t give up! Learning is a journey, keep going!';
        }
    }

    animateNumber(elementId, start, end, duration, suffix = '') {
        const element = document.getElementById(elementId);
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }

    restartQuiz() {
        // Reset all values
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswersCount = 0;
        this.userAnswers = [];
        this.answerSelected = false;
        
        // Clear any existing feedback
        if (this.currentFeedback) {
            try {
                document.body.removeChild(this.currentFeedback);
            } catch (e) {
                // Already removed
            }
            this.currentFeedback = null;
        }
        
        // Update UI
        document.getElementById('score').textContent = '0';
        
        // Generate new questions
        this.generateQuestions();
        
        // Show start screen
        this.showScreen('start-screen');
        
        // Reset next button
        document.getElementById('next-btn').innerHTML = 'Next Question <i class="fas fa-arrow-right"></i>';
    }

    shareScore() {
        const accuracy = Math.round((this.correctAnswersCount / this.questions.length) * 100);
        const shareText = `💻 I just scored ${this.score} points on TechQuest Java & Technology Quiz! 
📊 Accuracy: ${accuracy}% 
🎯 Difficulty: ${this.selectedDifficulty.charAt(0).toUpperCase() + this.selectedDifficulty.slice(1)}
☕ Test your Java knowledge too!`;

        if (navigator.share) {
            navigator.share({
                title: 'TechQuest Java & Technology Quiz Results',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                this.showFeedback('Results copied to clipboard!', 'success');
            }).catch(() => {
                // Fallback alert
                alert(shareText);
            });
        }
    }
}

// Initialize the quiz app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
    
    // Add some additional visual effects
    const addVisualEffects = () => {
        // Add hover effects to answer options
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('answer-option') && 
                !e.target.classList.contains('selected')) {
                e.target.style.transform = 'translateY(-2px) scale(1.02)';
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('answer-option') && 
                !e.target.classList.contains('selected')) {
                e.target.style.transform = '';
            }
        });
        
        // Add ripple effect to buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn') || 
                e.target.closest('.btn')) {
                const button = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
                button.classList.add('ripple');
                setTimeout(() => button.classList.remove('ripple'), 300);
            }
        });
    };
    
    addVisualEffects();
});

// Add custom CSS for additional effects
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: relative;
        overflow: hidden;
    }
    
    .ripple::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        animation: ripple-animation 0.3s ease-out;
    }
    
    @keyframes ripple-animation {
        to {
            width: 200px;
            height: 200px;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
    
    .answer-option {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .fade-in-up {
        animation: fadeInUp 0.5s ease-out forwards;
    }
`;
document.head.appendChild(style);