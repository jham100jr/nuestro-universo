document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js');

  const DATA = typeof DATOS !== 'undefined' ? DATOS : {};
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  const safeAddListener = (selector, eventName, handler) => {
    const el = $(selector);
    if (el) el.addEventListener(eventName, handler);
  };

  const createBurst = (containerId = '#confetti-container', amount = 40, origin = null) => {
    const container = $(containerId);
    if (!container) return;

    const bounds = origin ? origin.getBoundingClientRect() : null;
    const originX = bounds ? bounds.left + bounds.width / 2 : window.innerWidth / 2;
    const originY = bounds ? bounds.top + bounds.height / 2 : window.innerHeight / 2;
    const emojis = ['💖', '✨', '💘', '💕', '💗', '🌟'];
    for (let i = 0; i < amount; i++) {
      const petal = document.createElement('span');
      petal.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      petal.className = 'confetti-piece';
      petal.style.left = `${originX}px`;
      petal.style.top = `${originY}px`;
      petal.style.setProperty('--dx', `${(Math.random() - 0.5) * 500}px`);
      petal.style.setProperty('--dy', `${(Math.random() - 0.5) * 500}px`);
      petal.style.setProperty('--rot', `${(Math.random() - 0.5) * 540}deg`);
      petal.style.fontSize = `${14 + Math.random() * 24}px`;
      petal.style.animationDelay = `${Math.random() * 0.6}s`;
      container.appendChild(petal);
      setTimeout(() => petal.remove(), 2500);
    }
  };

  const initDateCounter = () => {
    const startDateInput = $('#custom-start-date');
    const saveBtn = $('#btn-save-date');
    const toggleBtn = $('#btn-toggle-date-picker');
    const pickerBox = $('#date-picker-box');
    const storageKey = 'love-story-start-date';
    const fallbackDate = (DATA && DATA.fechaInicio) ? DATA.fechaInicio.split('T')[0] : '2023-02-14';
    const savedDate = localStorage.getItem(storageKey) || fallbackDate;

    if (startDateInput) startDateInput.value = savedDate;

    const getStartDate = () => {
      const value = startDateInput ? startDateInput.value : savedDate;
      const date = new Date(`${value}T00:00:00`);
      return Number.isNaN(date.getTime()) ? new Date(`${fallbackDate}T00:00:00`) : date;
    };

    const updateCounter = () => {
      const start = getStartDate();
      const now = new Date();
      const diffMs = Math.max(0, now.getTime() - start.getTime());
      const totalSeconds = Math.floor(diffMs / 1000);
      const totalDays = Math.floor(totalSeconds / 86400);

      const years = now.getFullYear() - start.getFullYear();
      const months = (now.getMonth() - start.getMonth() + 12) % 12;
      const days = Math.max(0, now.getDate() - start.getDate());

      const setValue = (id, value) => {
        const el = $(id);
        if (el) el.textContent = value;
      };

      setValue('#years-val', String(Math.max(0, years)).padStart(2, '0'));
      setValue('#months-val', String(Math.max(0, months)).padStart(2, '0'));
      setValue('#days-val', String(Math.max(0, totalDays % 30)).padStart(2, '0'));
      setValue('#hours-val', String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, '0'));
      setValue('#minutes-val', String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0'));
      setValue('#seconds-val', String(totalSeconds % 60).padStart(2, '0'));

      const totalDaysPhrase = $('#total-days-phrase');
      if (totalDaysPhrase) {
        totalDaysPhrase.innerHTML = `Llevamos más de <strong>${totalDays} días</strong> escribiendo nuestra historia juntos.`;
      }
    };

    if (toggleBtn && pickerBox) {
      toggleBtn.addEventListener('click', () => pickerBox.classList.toggle('hidden'));
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        if (!startDateInput || !startDateInput.value) return;
        localStorage.setItem(storageKey, startDateInput.value);
        updateCounter();
        if (pickerBox) pickerBox.classList.add('hidden');
      });
    }

    updateCounter();
    setInterval(updateCounter, 1000);
  };

  const initNav = () => {
    $$('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        $$('.nav-link').forEach((item) => item.classList.remove('active'));
        link.classList.add('active');
      });
    });
  };

  const initMagicJar = () => {
    const reasons = DATA && DATA.razones ? DATA.razones : [
      'Porque contigo todo tiene sentido.',
      'Porque tu risa me hace sentir en casa.',
      'Porque cada día a tu lado se vuelve más especial.'
    ];

    const jarTrigger = $('#jar-trigger');
    const reasonText = $('#reason-text');
    const reasonCountTag = $('#reason-count-tag');
    const discoveredNum = $('#discovered-num');
    const nextBtn = $('#btn-next-reason');

    let index = 0;

    const revealReason = () => {
      if (!jarTrigger || !reasonText || !reasonCountTag || !discoveredNum) return;
      const reason = reasons[index % reasons.length];
      reasonText.textContent = `"${reason}"`;
      reasonCountTag.textContent = `Razón ${index + 1}`;
      discoveredNum.textContent = String(index + 1);
      jarTrigger.classList.remove('jar-active');
      void jarTrigger.offsetWidth;
      jarTrigger.classList.add('jar-active');
      index += 1;
    };

    if (jarTrigger) jarTrigger.addEventListener('click', revealReason);
    if (nextBtn) nextBtn.addEventListener('click', revealReason);
  };

  const initQuiz = () => {
    const questions = [
      {
        prompt: '¿Quién de los dos se enamoró primero?',
        options: ['Tú', 'Yo', 'Nosotros a la vez'],
        correct: 0
      },
      {
        prompt: '¿Qué es lo que más me gusta de ti?',
        options: ['Tu sonrisa', 'Tu forma de escuchar', 'Las dos cosas'],
        correct: 2
      },
      {
        prompt: '¿Cuál es nuestro destino favorito?',
        options: ['Vernos y abrazarnos', 'Solo hablar por chat', 'Salir sin hablar'],
        correct: 0
      },
      {
        prompt: '¿Qué tan segura estoy de que te amo con toda mi alma?',
        options: ['100%', '75%', '50%'],
        correct: 0
      }
    ];

    const quizQuestionTitle = $('#quiz-question-title');
    const quizOptionsContainer = $('#quiz-options-container');
    const quizFeedback = $('#quiz-feedback');
    const quizFeedbackText = $('#quiz-feedback-text');
    const quizProgress = $('#quiz-progress');
    const quizStepIndicator = $('#quiz-step-indicator');
    const quizNextBtn = $('#btn-quiz-next');
    const quizVictory = $('#quiz-victory');
    const quizRestart = $('#btn-quiz-restart');

    let currentIndex = 0;
    let score = 0;
    let answered = false;

    const showVictory = () => {
      if (quizVictory) quizVictory.classList.remove('hidden');
      if (quizFeedback) quizFeedback.classList.add('hidden');
      if (quizOptionsContainer) quizOptionsContainer.innerHTML = '';
      if (quizProgress) quizProgress.style.width = '100%';
      if (quizStepIndicator) quizStepIndicator.textContent = 'Resultado final';
      if (quizQuestionTitle) quizQuestionTitle.textContent = '¡Lo lograste!';
    };

    const renderQuestion = () => {
      if (!quizQuestionTitle || !quizOptionsContainer || !quizProgress || !quizStepIndicator) return;

      const question = questions[currentIndex];
      if (!question) {
        showVictory();
        return;
      }

      answered = false;
      quizQuestionTitle.textContent = question.prompt;
      quizStepIndicator.textContent = `Pregunta ${currentIndex + 1} de ${questions.length}`;
      quizProgress.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
      quizFeedback?.classList.add('hidden');
      quizOptionsContainer.innerHTML = '';

      question.options.forEach((option, optionIndex) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'quiz-option-btn';
        button.textContent = option;
        button.addEventListener('click', () => {
          if (answered) return;
          answered = true;

          const correct = question.correct === optionIndex;
          if (correct) score += 1;

          if (quizFeedback && quizFeedbackText) {
            quizFeedbackText.textContent = correct
              ? '¡Correcto! Tu conexión es de otro nivel 😍'
              : `Casi... la respuesta correcta era: ${question.options[question.correct]}`;
            quizFeedback.classList.remove('hidden');
          }

          [...quizOptionsContainer.querySelectorAll('button')].forEach((btn) => {
            btn.disabled = true;
            btn.classList.toggle('is-correct', btn.textContent === question.options[question.correct]);
          });
        });

        quizOptionsContainer.appendChild(button);
      });
    };

    if (quizNextBtn) {
      quizNextBtn.addEventListener('click', () => {
        currentIndex += 1;
        if (currentIndex >= questions.length) {
          showVictory();
          return;
        }
        renderQuestion();
      });
    }

    if (quizRestart) {
      quizRestart.addEventListener('click', () => {
        currentIndex = 0;
        score = 0;
        answered = false;
        if (quizVictory) quizVictory.classList.add('hidden');
        renderQuestion();
      });
    }

    renderQuestion();
  };

  const initLetter = () => {
    const card = $('#envelope-wrapper');
    const envelope = $('#envelope');
    const seal = $('#wax-seal');
    const toggleButton = $('#btn-toggle-letter');
    const letterBtnText = $('#letter-btn-text');
    const letterDate = $('#letter-date-display');

    const setState = (opened) => {
      if (!card) return;
      card.classList.toggle('opened', opened);
      if (envelope) envelope.classList.toggle('open', opened);
      if (seal) {
        seal.classList.toggle('broken', opened);
        seal.setAttribute('aria-expanded', String(opened));
        seal.setAttribute('aria-label', opened ? 'Cerrar la carta' : 'Abrir la carta');
      }
      if (toggleButton) toggleButton.setAttribute('aria-expanded', String(opened));
      if (letterBtnText) letterBtnText.textContent = opened ? 'Cerrar Carta de Amor' : 'Abrir Carta de Amor';
      if (letterDate) {
        letterDate.textContent = opened ? 'Bajo un cielo de estrellas' : 'Haz clic para abrir';
      }
    };

    if (seal) seal.addEventListener('click', () => setState(!card?.classList.contains('opened')));
    if (toggleButton) toggleButton.addEventListener('click', () => {
      const open = !card?.classList.contains('opened');
      setState(open);
    });
    setState(false);
  };

  const initWishModal = () => {
    const trigger = $('#btn-surprise-intro');
    const modal = $('#wish-modal');
    const closeBtn = $('#btn-close-wish');
    const sendWish = $('#btn-send-wish');
    const wishInput = $('#wish-input');
    const confirmation = $('#wish-confirmed');

    const openModal = () => {
      if (modal) modal.classList.remove('hidden');
    };

    const closeModal = () => {
      if (modal) modal.classList.add('hidden');
    };

    if (trigger) trigger.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    if (sendWish) {
      sendWish.addEventListener('click', () => {
        const value = wishInput ? wishInput.value.trim() : '';
        if (confirmation) {
          confirmation.textContent = value
            ? `💖 ¡Tu deseo ha sido sellado en el firmamento! “${value}”` 
            : '💖 ¡Tu deseo ha sido sellado en el firmamento!';
          confirmation.classList.remove('hidden');
        }
        if (modal) setTimeout(closeModal, 1800);
      });
    }
  };

  const initFinalEffects = () => {
    const heartBtn = $('#final-heart-btn');
    const supernovaBtn = $('#btn-supernova');
    const backBtn = $('#btnVolver');
    const finalScreen = $('#final');

    if (heartBtn) {
      heartBtn.addEventListener('click', () => createBurst('#confetti-container', 70, heartBtn));
    }

    if (supernovaBtn) {
      supernovaBtn.addEventListener('click', () => createBurst('#confetti-container', 100, supernovaBtn));
    }

    if (backBtn && finalScreen) {
      backBtn.addEventListener('click', () => {
        finalScreen.hidden = true;
      });
    }
  };

  const initMusicPlayer = () => {
    const audio = $('#audio-element');
    const playPauseBtn = $('#btn-play-pause');
    const soundBtn = $('#btn-sound-mode');
    const playIcon = $('#play-icon');
    const uploadInput = $('#custom-audio-upload');
    const titleEl = $('#music-title');
    const subtitleEl = $('#music-subtitle');

    if (!audio) return;

    const source = DATA && DATA.musica ? DATA.musica : '';
    let currentObjectUrl = '';
    let hasSource = Boolean(source);
    if (source) audio.src = source;
    audio.loop = true;
    audio.volume = 0.5;

    const setStatus = (message) => {
      if (subtitleEl) subtitleEl.textContent = message;
    };

    const syncPlayer = (isPlaying) => {
      if (playIcon) {
        playIcon.className = isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play';
      }
      const vinyl = $('#vinyl-disc');
      if (vinyl) vinyl.classList.toggle('spinning', isPlaying);
      if (playPauseBtn) {
        playPauseBtn.title = isPlaying ? 'Pausar música' : 'Reproducir música';
        playPauseBtn.setAttribute('aria-label', playPauseBtn.title);
      }
    };

    audio.addEventListener('playing', () => syncPlayer(true));
    audio.addEventListener('pause', () => syncPlayer(false));
    audio.addEventListener('ended', () => syncPlayer(false));
    audio.addEventListener('error', () => {
      syncPlayer(false);
      setStatus('No se encontró la canción. Carga un archivo de audio.');
    });

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', async () => {
        if (audio.paused) {
          if (!hasSource) {
            setStatus('Carga una canción con el botón de la nube.');
            uploadInput?.click();
            return;
          }
          try {
            await audio.play();
          } catch (error) {
            console.warn('No se pudo reproducir la música:', error);
            setStatus('No se pudo reproducir. Revisa el archivo o carga otro.');
            syncPlayer(false);
          }
        } else {
          audio.pause();
        }
      });
    }

    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        audio.muted = !audio.muted;
        soundBtn.classList.toggle('is-muted', audio.muted);
        soundBtn.title = audio.muted ? 'Activar sonido' : 'Silenciar música';
        soundBtn.setAttribute('aria-label', soundBtn.title);
      });
    }

    if (uploadInput) {
      uploadInput.addEventListener('change', (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
        currentObjectUrl = URL.createObjectURL(file);
        hasSource = true;
        audio.src = currentObjectUrl;
        audio.load();
        if (titleEl) titleEl.textContent = file.name;
        setStatus('Canción lista. Pulsa reproducir.');
      });
    }
  };

  safeAddListener('#btn-toggle-date-picker', 'click', () => {});
  safeAddListener('#btn-save-date', 'click', () => {});

  initDateCounter();
  initNav();
  initMagicJar();
  initQuiz();
  initLetter();
  initWishModal();
  initFinalEffects();
  initMusicPlayer();
});
