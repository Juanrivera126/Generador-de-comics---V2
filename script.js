class ComicGenerator {
    constructor() {
        this.promptInput = document.getElementById('promptInput');
        this.generateBtn = document.getElementById('generateBtn');
        this.continueBtn = document.getElementById('continueBtn');
        this.regenerateBtn = document.getElementById('regenerateBtn');
        this.artStyleSelect = document.getElementById('artStyleSelect');
        this.customStyleInput = document.getElementById('customStyleInput');
        this.customStyleRow = document.getElementById('customStyleRow');
        this.imgToImgCheck = document.getElementById('imgToImgCheck');
        this.panelCountSelect = document.getElementById('panelCountSelect');
        this.progressFill = document.querySelector('.progress-fill');
        this.progressText = document.querySelector('.progress-text');
        this.scriptOutput = document.getElementById('scriptOutput');
        this.comicGrid = document.getElementById('comicGrid');
        this.currentScript = null;
        this.panelCount = 4;
        this.currentPrompt = '';
        this.currentArtStyle = 'none';
        this.currentImgToImg = false;

        this.panels = [
            document.getElementById('panel1'),
            document.getElementById('panel2'),
            document.getElementById('panel3'),
            document.getElementById('panel4'),
            document.getElementById('panel5'),
            document.getElementById('panel6')
        ];

        this.publishBtn = document.getElementById('publishBtn');
        this.downloadComicBtn = document.getElementById('downloadComicBtn');
        this.downloadButtonsContainer = document.querySelector('.download-buttons');
        this.generatorTab = document.getElementById('generatorTab');
        this.settingsTab = document.getElementById('settingsTab');
        this.generatorView = document.getElementById('generatorView');
        this.settingsView = document.getElementById('settingsView');
        this.clearBtn = document.getElementById('clearBtn');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.isGenerating = false;
        this.cancelRequested = false;
        this.abortController = null;

        this.modelSelector = document.getElementById('modelSelector');
        this.imageApiSelect = document.getElementById('imageApiSelect');
        this.pollinationsSettings = document.getElementById('pollinationsSettings');
        this.saveSettingsBtn = document.getElementById('saveSettingsBtn');
        this.resetSettingsBtn = document.getElementById('resetSettingsBtn');

        this.settings = {
            textModel: 'openai',
            imageApi: 'pollinations',
            pollinationsModel: 'flux',
            apiKey: '',
            language: 'es',
            aspectRatio: '16:9',
            artStyle: 'none',
            customStyle: ''
        };

        this.apiKeyInput = document.getElementById('apiKeyInput');
        this.getApiKeyBtn = document.getElementById('getApiKeyBtn');
        this.languageSelector = document.getElementById('languageSelector');
        this.aspectRatioSelector = document.getElementById('aspectRatioSelector');
        this.updateScriptBtn = document.getElementById('updateScriptBtn');

        // Traducciones de la interfaz
        this.translations = {
            es: {
                title: 'Generador de Cómics con IA',
                subtitle: 'Introduce una idea para la historia y mira cómo la IA crea una tira cómica de 4 paneles',
                generatorTab: 'Generador',
                settingsTab: 'Ajustes',
                promptPlaceholder: 'Introduce tu idea para la historia... (ej., \'Un robot hace inventos locos\', \'Un gato descubre que puede volar\', \'Dos aliens discuten sobre comida terrestre\')',
                artStyle: 'Estilo de Arte:',
                customStyle: 'Estilo Personalizado:',
                customStylePlaceholder: 'Introduce etiquetas de estilo personalizadas (ej., \'pintura al óleo, estilo barroco, iluminación dramática\')',
                imgToImg: 'Imagen-a-Imagen:',
                imgToImgLabel: 'Fuerza el uso del modelo gemini banana nano',
                panelCount: 'Número de Paneles:',
                generateBtn: 'Generar Cómic',
                clearBtn: 'Limpiar',
                cancelBtn: 'Cancelar',
                continueBtn: 'Continuar Historia',
                regenerateBtn: 'Regenerar Imágenes',
                publishBtn: '📺 Descargar Presentación',
                downloadComicBtn: '🎨 Descargar Tira Cómica',
                scriptTitle: 'Guion Generado',
                settingsTitle: 'Ajustes',
                settingsSubtitle: 'Configura los ajustes de la API para la generación de texto e imágenes',
                languageLabel: 'Idioma:',
                textApiTitle: 'API de Generación de Texto',
                modelLabel: 'Modelo:',
                imageApiTitle: 'API de Generación de Imágenes',
                imageApiLabel: 'API de Imagen:',
                pollinationsModelLabel: 'Modelo:',
                apiKeyTitle: 'Clave API de Pollinations',
                apiKeyLabel: 'Clave API:',
                apiKeyPlaceholder: 'plln_sk_...',
                getApiKeyBtn: '🔑 Obtener Key',
                apiKeyHint: 'Obtén tu propia clave para una generación más rápida y personal.',
                saveSettingsBtn: 'Guardar Ajustes',
                resetSettingsBtn: 'Restablecer a Valores Predeterminados',
                cleanStorageBtn: '🗑️ Limpiar Almacenamiento',
                readyToGenerate: 'Listo para generar',
                generatingScript: 'Generando guion...',
                scriptGenerated: '¡Guion generado! Creando paneles...',
                generatingPanel: 'Generando panel',
                panelCompleted: '¡Panel {0} completado!',
                comicCompleted: '¡Generación de cómic completada!',
                continuingStory: 'Continuando la historia...',
                continuationGenerated: '¡Guion de continuación generado! Creando nuevos paneles...',
                continuationCompleted: '¡Continuación de la historia completada!',
                regeneratingImages: 'Regenerando imágenes de los paneles...',
                regeneratingPanel: 'Regenerando panel',
                panelRegenerated: '¡Panel {0} regenerado!',
                regenerationCompleted: '¡Regeneración de imágenes completada!',
                generationCancelled: 'Generación cancelada',
                errorGenerating: 'Error al generar el cómic. Por favor, inténtalo de nuevo.',
                errorContinuing: 'Error al continuar el cómic. Por favor, inténtalo de nuevo.',
                errorRegenerating: 'Error al regenerar las imágenes. Por favor, inténtalo de nuevo.',
                errorDownloading: 'Error al descargar el cómic. Por favor, inténtalo de nuevo.',
                alertNoPrompt: 'Por favor, introduce una idea para la historia',
                alertNoComic: 'Genera un cómic antes de continuar',
                alertNoComicDownload: 'Genera un cómic antes de descargar',
                alertNoImages: 'No hay imágenes generadas para descargar',
                alertSettingsSaved: '¡Ajustes guardados con éxito!',
                apiKeyObtained: '¡Clave API obtenida con éxito!',
                errorGeneratingPanel: 'Error al generar el panel',
                retryPanel: 'Reintentar',
                simplifyPanel: 'Simplificar',
                hidePanel: 'Ocultar',
                confirmHidePanel: '¿Estás seguro de que quieres ocultar este panel? Podrás mostrarlo de nuevo editando el guion.',
                editPanel: 'Editar',
                viewDescription: 'Ver descripción actual',
                editPanelTitle: 'Editar Panel',
                visualDescription: 'Descripción Visual:',
                dialogue: 'Diálogo:',
                optional: 'opcional',
                editTip: 'Consejo: Usa descripciones simples. Evita detalles técnicos como "pantalla muestra icono de..." o "desenfocado para..."',
                cancel: 'Cancelar',
                saveAndGenerate: 'Guardar y Generar',
                alertNoDescription: 'La descripción visual no puede estar vacía',
                regenerateImage: 'Regenerar imagen',
                alertNoScript: 'No hay guión para actualizar',
                alertNoPanelsToUpdate: 'No hay paneles con imágenes para actualizar',
                confirmUpdateScript: '¿Actualizar los paneles con los cambios del guión? Esto regenerará solo los paneles que ya tienen imágenes.',
                updatingPanels: 'Actualizando paneles...',
                updatingPanel: 'Actualizando panel',
                panelUpdated: 'Panel actualizado',
                updateCompleted: '¡Actualización completada!',
                errorUpdating: 'Error al actualizar los paneles',
                aspectRatioTitle: 'Relación de Aspecto de Diapositivas',
                aspectRatioLabel: 'Relación de Aspecto:',
                aspectRatioHint: 'Define las dimensiones de las diapositivas en la presentación descargada.'
            },
            en: {
                title: 'AI Comic Generator',
                subtitle: 'Enter a story idea and watch the AI create a 4-panel comic strip',
                generatorTab: 'Generator',
                settingsTab: 'Settings',
                promptPlaceholder: 'Enter your story idea... (e.g., \'A robot makes crazy inventions\', \'A cat discovers it can fly\', \'Two aliens discuss Earth food\')',
                artStyle: 'Art Style:',
                customStyle: 'Custom Style:',
                customStylePlaceholder: 'Enter custom style tags (e.g., \'oil painting, baroque style, dramatic lighting\')',
                imgToImg: 'Image-to-Image:',
                imgToImgLabel: 'Force use of gemini banana nano model',
                panelCount: 'Number of Panels:',
                generateBtn: 'Generate Comic',
                clearBtn: 'Clear',
                cancelBtn: 'Cancel',
                continueBtn: 'Continue Story',
                regenerateBtn: 'Regenerate Images',
                publishBtn: '📺 Download Presentation',
                downloadComicBtn: '🎨 Download Comic Strip',
                scriptTitle: 'Generated Script',
                settingsTitle: 'Settings',
                settingsSubtitle: 'Configure API settings for text and image generation',
                languageLabel: 'Language:',
                textApiTitle: 'Text Generation API',
                modelLabel: 'Model:',
                imageApiTitle: 'Image Generation API',
                imageApiLabel: 'Image API:',
                pollinationsModelLabel: 'Model:',
                apiKeyTitle: 'Pollinations API Key',
                apiKeyLabel: 'API Key:',
                apiKeyPlaceholder: 'plln_sk_...',
                getApiKeyBtn: '🔑 Get Key',
                apiKeyHint: 'Get your own key for faster and personalized generation.',
                saveSettingsBtn: 'Save Settings',
                resetSettingsBtn: 'Reset to Defaults',
                cleanStorageBtn: '🗑️ Clean Storage',
                readyToGenerate: 'Ready to generate',
                generatingScript: 'Generating script...',
                scriptGenerated: 'Script generated! Creating panels...',
                generatingPanel: 'Generating panel',
                panelCompleted: 'Panel {0} completed!',
                comicCompleted: 'Comic generation completed!',
                continuingStory: 'Continuing the story...',
                continuationGenerated: 'Continuation script generated! Creating new panels...',
                continuationCompleted: 'Story continuation completed!',
                regeneratingImages: 'Regenerating panel images...',
                regeneratingPanel: 'Regenerating panel',
                panelRegenerated: 'Panel {0} regenerated!',
                regenerationCompleted: 'Image regeneration completed!',
                generationCancelled: 'Generation cancelled',
                errorGenerating: 'Error generating comic. Please try again.',
                errorContinuing: 'Error continuing comic. Please try again.',
                errorRegenerating: 'Error regenerating images. Please try again.',
                errorDownloading: 'Error downloading comic. Please try again.',
                alertNoPrompt: 'Please enter a story idea',
                alertNoComic: 'Generate a comic before continuing',
                alertNoComicDownload: 'Generate a comic before downloading',
                alertNoImages: 'No generated images to download',
                alertSettingsSaved: 'Settings saved successfully!',
                apiKeyObtained: 'API key obtained successfully!',
                errorGeneratingPanel: 'Error generating panel',
                retryPanel: 'Retry',
                simplifyPanel: 'Simplify',
                hidePanel: 'Hide',
                confirmHidePanel: 'Are you sure you want to hide this panel? You can show it again by editing the script.',
                editPanel: 'Edit',
                viewDescription: 'View current description',
                editPanelTitle: 'Edit Panel',
                visualDescription: 'Visual Description:',
                dialogue: 'Dialogue:',
                optional: 'optional',
                editTip: 'Tip: Use simple descriptions. Avoid technical details like "screen shows icon of..." or "blurred to..."',
                cancel: 'Cancel',
                saveAndGenerate: 'Save and Generate',
                alertNoDescription: 'Visual description cannot be empty',
                regenerateImage: 'Regenerate image',
                alertNoScript: 'No script to update',
                alertNoPanelsToUpdate: 'No panels with images to update',
                confirmUpdateScript: 'Update panels with script changes? This will regenerate only panels that already have images.',
                updatingPanels: 'Updating panels...',
                updatingPanel: 'Updating panel',
                panelUpdated: 'Panel updated',
                updateCompleted: 'Update completed!',
                errorUpdating: 'Error updating panels',
                aspectRatioTitle: 'Slide Aspect Ratio',
                aspectRatioLabel: 'Aspect Ratio:',
                aspectRatioHint: 'Defines the dimensions of slides in the downloaded presentation.'
            },
            fr: {
                title: 'Générateur de BD avec IA',
                subtitle: 'Entrez une idée d\'histoire et regardez l\'IA créer une bande dessinée de 4 cases',
                generatorTab: 'Générateur',
                settingsTab: 'Paramètres',
                promptPlaceholder: 'Entrez votre idée d\'histoire... (par ex., \'Un robot fait des inventions folles\', \'Un chat découvre qu\'il peut voler\', \'Deux extraterrestres discutent de la nourriture terrestre\')',
                artStyle: 'Style Artistique:',
                customStyle: 'Style Personnalisé:',
                customStylePlaceholder: 'Entrez des balises de style personnalisées (par ex., \'peinture à l\'huile, style baroque, éclairage dramatique\')',
                imgToImg: 'Image-à-Image:',
                imgToImgLabel: 'Forcer l\'utilisation du modèle gemini banana nano',
                panelCount: 'Nombre de Cases:',
                generateBtn: 'Générer BD',
                clearBtn: 'Effacer',
                cancelBtn: 'Annuler',
                continueBtn: 'Continuer l\'Histoire',
                regenerateBtn: 'Régénérer les Images',
                publishBtn: '📺 Télécharger la Présentation',
                downloadComicBtn: '🎨 Télécharger la Bande Dessinée',
                scriptTitle: 'Scénario Généré',
                settingsTitle: 'Paramètres',
                settingsSubtitle: 'Configurez les paramètres de l\'API pour la génération de texte et d\'images',
                languageLabel: 'Langue:',
                textApiTitle: 'API de Génération de Texte',
                modelLabel: 'Modèle:',
                imageApiTitle: 'API de Génération d\'Images',
                imageApiLabel: 'API d\'Image:',
                pollinationsModelLabel: 'Modèle:',
                apiKeyTitle: 'Clé API Pollinations',
                apiKeyLabel: 'Clé API:',
                apiKeyPlaceholder: 'plln_sk_...',
                getApiKeyBtn: '🔑 Obtenir la Clé',
                apiKeyHint: 'Obtenez votre propre clé pour une génération plus rapide et personnalisée.',
                saveSettingsBtn: 'Enregistrer les Paramètres',
                resetSettingsBtn: 'Réinitialiser aux Valeurs par Défaut',
                cleanStorageBtn: '🗑️ Nettoyer le Stockage',
                readyToGenerate: 'Prêt à générer',
                generatingScript: 'Génération du scénario...',
                scriptGenerated: 'Scénario généré! Création des cases...',
                generatingPanel: 'Génération de la case',
                panelCompleted: 'Case {0} terminée!',
                comicCompleted: 'Génération de la BD terminée!',
                continuingStory: 'Continuation de l\'histoire...',
                continuationGenerated: 'Scénario de continuation généré! Création de nouvelles cases...',
                continuationCompleted: 'Continuation de l\'histoire terminée!',
                regeneratingImages: 'Régénération des images des cases...',
                regeneratingPanel: 'Régénération de la case',
                panelRegenerated: 'Case {0} régénérée!',
                regenerationCompleted: 'Régénération des images terminée!',
                generationCancelled: 'Génération annulée',
                errorGenerating: 'Erreur lors de la génération de la BD. Veuillez réessayer.',
                errorContinuing: 'Erreur lors de la continuation de la BD. Veuillez réessayer.',
                errorRegenerating: 'Erreur lors de la régénération des images. Veuillez réessayer.',
                errorDownloading: 'Erreur lors du téléchargement de la BD. Veuillez réessayer.',
                alertNoPrompt: 'Veuillez entrer une idée d\'histoire',
                alertNoComic: 'Générez une BD avant de continuer',
                alertNoComicDownload: 'Générez une BD avant de télécharger',
                alertNoImages: 'Aucune image générée à télécharger',
                alertSettingsSaved: 'Paramètres enregistrés avec succès!',
                apiKeyObtained: 'Clé API obtenue avec succès!',
                errorGeneratingPanel: 'Erreur lors de la génération de la case',
                retryPanel: 'Réessayer',
                simplifyPanel: 'Simplifier',
                hidePanel: 'Masquer',
                confirmHidePanel: 'Êtes-vous sûr de vouloir masquer cette case? Vous pourrez la réafficher en modifiant le scénario.',
                editPanel: 'Modifier',
                viewDescription: 'Voir la description actuelle',
                editPanelTitle: 'Modifier la Case',
                visualDescription: 'Description Visuelle:',
                dialogue: 'Dialogue:',
                optional: 'optionnel',
                editTip: 'Conseil: Utilisez des descriptions simples. Évitez les détails techniques comme "écran affiche icône de..." ou "flouté pour..."',
                cancel: 'Annuler',
                saveAndGenerate: 'Enregistrer et Générer',
                alertNoDescription: 'La description visuelle ne peut pas être vide',
                regenerateImage: 'Régénérer l\'image',
                alertNoScript: 'Aucun scénario à mettre à jour',
                alertNoPanelsToUpdate: 'Aucune case avec des images à mettre à jour',
                confirmUpdateScript: 'Mettre à jour les cases avec les modifications du scénario? Cela régénérera uniquement les cases qui ont déjà des images.',
                updatingPanels: 'Mise à jour des cases...',
                updatingPanel: 'Mise à jour de la case',
                panelUpdated: 'Case mise à jour',
                updateCompleted: 'Mise à jour terminée!',
                errorUpdating: 'Erreur lors de la mise à jour des cases',
                aspectRatioTitle: 'Format des Diapositives',
                aspectRatioLabel: 'Format:',
                aspectRatioHint: 'Définit les dimensions des diapositives dans la présentation téléchargée.'
            }
        };

        this.init();
    }

    init() {
        this.generateBtn.addEventListener('click', () => this.generateComic());
        this.continueBtn.addEventListener('click', () => this.continueComic());
        this.regenerateBtn.addEventListener('click', () => this.regenerateImages());
        this.promptInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.generateComic();
            }
        });

        this.artStyleSelect.addEventListener('change', () => this.handleArtStyleChange());

        this.publishBtn.addEventListener('click', () => this.downloadComic());
        this.downloadComicBtn.addEventListener('click', () => this.downloadComicStrip());
        this.generatorTab.addEventListener('click', () => this.switchToGenerator());
        this.settingsTab.addEventListener('click', () => this.switchToSettings());
        this.clearBtn.addEventListener('click', () => this.clearAll());

        this.cancelBtn.addEventListener('click', () => this.cancelGeneration());

        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => this.toggleTheme());
        this.loadTheme();

        this.panels.forEach((panel, index) => {
            this.setupPanelInfo(panel, index);
        });

        this.imageApiSelect.addEventListener('change', () => this.handleImageApiChange());
        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        this.resetSettingsBtn.addEventListener('click', () => this.resetSettings());
        this.getApiKeyBtn.addEventListener('click', () => this.startAuthFlow());
        this.languageSelector.addEventListener('change', () => this.handleLanguageChange());
        this.updateScriptBtn.addEventListener('click', () => this.updateScriptChanges());
        
        // Agregar event listener para el botón de limpiar almacenamiento
        const cleanStorageBtn = document.getElementById('cleanStorageBtn');
        if (cleanStorageBtn) {
            cleanStorageBtn.addEventListener('click', () => {
                if (confirm('¿Estás seguro de que quieres limpiar el almacenamiento? Esto eliminará todos los datos excepto tus ajustes y API key.')) {
                    this.cleanupLocalStorage();
                    alert('Almacenamiento limpiado exitosamente.');
                }
            });
        }

        this.checkUrlForApiKey();
        this.loadSettings();
        this.updateInterfaceLanguage();
        this.updatePanelAspectRatio(); // Aplicar aspect ratio inicial
        this.loadPollinationsModels(); // Cargar modelos dinámicamente
    }

    updatePanelAspectRatio() {
        const aspectRatio = this.settings.aspectRatio || '16:9';
        const aspectRatioMap = {
            '16:9': '16 / 9',
            '1:1': '1 / 1',
            '9:16': '9 / 16'
        };
        
        const ratio = aspectRatioMap[aspectRatio] || '16 / 9';
        
        // Aplicar el aspect-ratio a todos los paneles del DOM (no solo this.panels)
        document.querySelectorAll('.panel').forEach(panel => {
            panel.style.aspectRatio = ratio;
        });
    }

    startAuthFlow() {
        const redirectUrl = window.location.href.split('#')[0];
        window.location.href = `https://enter.pollinations.ai/authorize?redirect_url=${encodeURIComponent(redirectUrl)}`;
    }

    checkUrlForApiKey() {
        const hashParams = new URLSearchParams(window.location.hash.slice(1));
        const apiKey = hashParams.get('api_key');

        if (apiKey) {
            this.settings.apiKey = apiKey;
            if (this.apiKeyInput) this.apiKeyInput.value = apiKey;
            localStorage.setItem('pollinations_api_key', apiKey);
            window.history.replaceState(null, null, window.location.pathname + window.location.search);
            this.updateProgress(100, this.getTranslation('apiKeyObtained'));
        } else {
            const savedKey = localStorage.getItem('pollinations_api_key');
            if (savedKey) {
                this.settings.apiKey = savedKey;
                if (this.apiKeyInput) this.apiKeyInput.value = savedKey;
            }
        }
    }

    handleArtStyleChange() {
        const selectedStyle = this.artStyleSelect.value;
        if (selectedStyle === 'custom') {
            this.customStyleRow.style.display = 'flex';
        } else {
            this.customStyleRow.style.display = 'none';
        }
    }

    setupPanelInfo(panel, panelIndex) {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'panel-info';
        panel.appendChild(infoDiv);

        // Botón de regenerar
        const regenerateBtn = document.createElement('button');
        regenerateBtn.className = 'regenerate-panel-btn';
        regenerateBtn.innerHTML = '&#x21bb;';
        regenerateBtn.title = this.getTranslation('regenerateImage') || 'Regenerar imagen';
        regenerateBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.regeneratePanelImage(panelIndex);
        });
        panel.appendChild(regenerateBtn);

        // Botón de ocultar
        const hideBtn = document.createElement('button');
        hideBtn.className = 'hide-panel-btn-icon';
        hideBtn.innerHTML = '🗑️';
        hideBtn.title = this.getTranslation('hidePanel') || 'Ocultar panel';
        hideBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(this.getTranslation('confirmHidePanel') || '¿Estás seguro de que quieres ocultar este panel?')) {
                panel.style.display = 'none';
                if (this.currentScript && this.currentScript.panels[panelIndex]) {
                    this.currentScript.panels[panelIndex].hidden = true;
                }
            }
        });
        panel.appendChild(hideBtn);

        const toggleInfo = () => {
            if (this.currentScript && this.currentScript.panels[panelIndex]) {
                const panelData = this.currentScript.panels[panelIndex];
                const visualDesc = panelData.enhanced_visual_description || panelData.visual_description || 'No description';

                if (infoDiv.classList.contains('visible')) {
                    infoDiv.classList.remove('visible');
                } else {
                    infoDiv.innerHTML = `
                        <h4>Panel ${panelIndex + 1}</h4>
                        <p><strong>Visual:</strong> ${visualDesc}</p>
                        ${panelData.dialogue ? `<div class="dialogue"><strong>Diálogo:</strong> "${panelData.dialogue}"</div>` : ''}
                    `;
                    infoDiv.classList.add('visible');
                }
            }
        };

        infoDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            infoDiv.classList.remove('visible');
        });

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeName === 'IMG') {
                        node.addEventListener('click', (e) => {
                            e.stopPropagation();
                            toggleInfo();
                        });
                        node.style.cursor = 'pointer';
                    }
                });
            });
        });

        observer.observe(panel, { childList: true });

        const speechBubble = panel.querySelector('.speech-bubble');
        speechBubble.addEventListener('click', (e) => {
            e.stopPropagation();
            this.editSpeechBubble(speechBubble, panelIndex);
        });
    }

    async generateComic() {
        if (!this.validateApiKey()) {
            return;
        }

        const prompt = this.promptInput.value.trim();
        if (!prompt) {
            alert(this.getTranslation('alertNoPrompt'));
            return;
        }

        this.currentPrompt = prompt;
        this.currentArtStyle = this.artStyleSelect.value;
        this.currentImgToImg = this.imgToImgCheck.checked;

        const selectedPanelCount = parseInt(this.panelCountSelect.value);

        this.panelCount = selectedPanelCount;
        this.clearExistingPanels();
        this.continueBtn.style.display = 'none';
        this.downloadButtonsContainer.style.display = 'none';

        this.isGenerating = true;
        this.cancelRequested = false;
        this.abortController = new AbortController();
        this.setLoading(true, 'generate');
        this.updateProgress(0, this.getTranslation('generatingScript'));
        this.showCancelButton();

        try {
            const script = await this.generateScript(prompt);
            if (this.cancelRequested) return;

            this.currentScript = script;
            this.displayScript(script);
            this.updateProgress(20, this.getTranslation('scriptGenerated'));

            this.ensurePanelCount(selectedPanelCount);

            for (let i = 0; i < selectedPanelCount; i++) {
                if (this.cancelRequested) break;
                this.updateProgress(20 + (i * (80 / selectedPanelCount)), `${this.getTranslation('generatingPanel')} ${i + 1}...`);
                await this.generatePanel(i, script.panels[i], script);
                if (this.cancelRequested) break;
                this.updateProgress(20 + ((i + 1) * (80 / selectedPanelCount)), this.getTranslation('panelCompleted').replace('{0}', i + 1));
            }

            if (!this.cancelRequested) {
                this.updateProgress(100, this.getTranslation('comicCompleted'));
                this.continueBtn.style.display = 'block';
                this.regenerateBtn.style.display = 'block';
                this.downloadButtonsContainer.style.display = 'flex';
            }

        } catch (error) {
            if (!this.cancelRequested) {
                console.error('Error generating comic:', error);
                let errorMessage = this.getTranslation('errorGenerating');
                if (error.message) {
                    errorMessage += `\n\nDetalles del error: ${error.message}`;
                }
                this.updateProgress(0, errorMessage);
            }
        } finally {
            this.isGenerating = false;
            this.abortController = null;
            this.setLoading(false, 'generate');
            this.hideCancelButton();
        }
    }

    async continueComic() {
        if (!this.validateApiKey()) {
            return;
        }

        if (!this.currentScript) {
            alert(this.getTranslation('alertNoComic'));
            return;
        }

        const selectedPanelCount = parseInt(this.panelCountSelect.value);

        this.isGenerating = true;
        this.cancelRequested = false;
        this.abortController = new AbortController();
        this.setLoading(true, 'continue');
        this.updateProgress(0, this.getTranslation('continuingStory'));
        this.showCancelButton();

        try {
            const continuationScript = await this.generateScript(null, true);
            if (this.cancelRequested) return;

            this.currentScript.characters = continuationScript.characters || this.currentScript.characters;

            const nextPanelNumber = this.currentScript.panels.length + 1;
            const newPanels = continuationScript.panels.map((panel, index) => ({
                ...panel,
                panel_number: nextPanelNumber + index
            }));

            this.currentScript.panels = [...this.currentScript.panels, ...newPanels];

            this.displayScript(this.currentScript);
            this.updateProgress(20, this.getTranslation('continuationGenerated'));

            for (let i = 0; i < selectedPanelCount; i++) {
                const panelIndex = this.panelCount + i;
                this.createNewPanel(panelIndex);
            }

            // Asegurar que todos los paneles nuevos tengan el aspect ratio correcto
            this.updatePanelAspectRatio();

            for (let i = 0; i < selectedPanelCount; i++) {
                if (this.cancelRequested) break;
                const panelIndex = this.panelCount + i;
                this.updateProgress(20 + (i * (80 / selectedPanelCount)), `${this.getTranslation('generatingPanel')} ${panelIndex + 1}...`);
                await this.generatePanel(panelIndex, newPanels[i], this.currentScript);
                if (this.cancelRequested) break;
                this.updateProgress(20 + ((i + 1) * (80 / selectedPanelCount)), this.getTranslation('panelCompleted').replace('{0}', panelIndex + 1));
            }

            if (!this.cancelRequested) {
                this.panelCount += selectedPanelCount;
                this.updateProgress(100, this.getTranslation('continuationCompleted'));
            }

        } catch (error) {
            if (!this.cancelRequested) {
                console.error('Error continuing comic:', error);
                this.updateProgress(0, this.getTranslation('errorContinuing'));
            }
        } finally {
            this.isGenerating = false;
            this.abortController = null;
            this.setLoading(false, 'continue');
            this.hideCancelButton();
        }
    }

    compressImage(dataUrl, quality = 0.8, scale = 0.8, format = 'image/webp') {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const newWidth = Math.max(1, Math.floor(img.width * scale));
                const newHeight = Math.max(1, Math.floor(img.height * scale));
                
                canvas.width = newWidth;
                canvas.height = newHeight;
                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, newWidth, newHeight);
                
                resolve(canvas.toDataURL(format, quality));
            };
            img.src = dataUrl;
        });
    }

    async downloadComic() {
        if (!this.currentScript) {
            alert(this.getTranslation('alertNoComicDownload'));
            return;
        }

        this.setLoading(true, 'publish');

        try {
            const panelPromises = this.panels.map(panel => {
                const img = panel.querySelector('img');
                if (img && img.src) {
                    return this.urlToDataUrl(img.src);
                }
                return Promise.resolve(null);
            });

            const panelImageDatas = await Promise.all(panelPromises);

            // Filtrar solo las imágenes válidas
            const validImages = panelImageDatas.filter(img => img !== null);

            if (validImages.length === 0) {
                alert(this.getTranslation('alertNoImages'));
                return;
            }

            // Comprimir imágenes para reducir el tamaño
            const compressedImages = await Promise.all(
                validImages.map(imgData => 
                    this.compressImage(imgData, 0.7, 0.8, 'image/webp')
                )
            );

            // Crear el array de imágenes comprimidas en base64 para el template
            let arrayContent = "";
            compressedImages.forEach(img => {
                arrayContent += `        '${img}',\n`;
            });

            // Template de la presentación de diapositivas
            const aspectRatio = this.settings.aspectRatio || '16:9';
            const aspectRatioStyles = this.getAspectRatioStyles(aspectRatio);
            
            const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=yes,minimal-ui">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <title>${this.currentScript.title || 'Presentación de Cómic'}</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            height: 100%;
            overflow: hidden;
            background-color: #0a0a0a;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .presentation {
            position: relative;
            ${aspectRatioStyles.container}
            background-color: #1a1a1a;
            color: white;
            box-shadow: 0 10px 50px rgba(0,0,0,0.5);
        }
        .slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
            padding-bottom: 40px;
            box-sizing: border-box;
            opacity: 0;
            transition: all 0.5s ease-in-out;
        }
        .slide.active {
            opacity: 1;
            z-index: 1;
        }
        .slide img {
            ${aspectRatioStyles.image}
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.5);
        }
        .nav-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(255,255,255,0.2);
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
            font-size: 1.5em;
            border-radius: 50%;
            z-index: 2;
            transition: background-color 0.3s;
        }
        .nav-button:hover {
            background-color: rgba(255,255,255,0.3);
        }
        .nav-button:disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }
        #prevBtn {
            left: 20px;
        }
        #nextBtn {
            right: 20px;
        }
        .indicators {
            position: absolute;
            bottom: 35px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            z-index: 2;
        }
        .indicator {
            width: 12px;
            height: 12px;
            background-color: rgba(255,255,255,0.3);
            border-radius: 50%;
            margin: 0 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .indicator:hover {
            background-color: rgba(255,255,255,0.5);
        }
        .indicator.active {
            background-color: white;
        }
        footer {
            position: absolute;
            bottom: 5px;
            left: 0;
            width: 100%;
            text-align: center;
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.4);
            z-index: 3;
            pointer-events: none;
            font-family: sans-serif;
        }
    </style>
</head>
<body>
    <div class="presentation">
        <div id="slideContainer">
            <!-- Las diapositivas se generarán dinámicamente aquí -->
        </div>
        
        <button id="prevBtn" class="nav-button">&#10094;</button>
        <button id="nextBtn" class="nav-button">&#10095;</button>
        
        <div class="indicators"></div>

        <footer>Diseñado por Juan Guillermo Rivera Berrío con tecnología Gemini 2.5 Pro (idea original de dimlylitsouls en WebSim)</footer>
    </div>

<script type="module">
    const slideContainer = document.getElementById('slideContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelector('.indicators');

    let slides = [];
    let currentSlide = 0;

    const transitions = ['fade', 'slideLeft', 'slideRight', 'slideUp', 'slideDown', 'rotate', 'scale'];

    function initSlides() {
        imageUrls.forEach((url, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide' + (index === 0 ? ' active' : '');

            const img = document.createElement('img');
            img.src = url;
            img.alt = \`Panel \${index + 1}\`;

            img.onerror = function () {
                this.style.display = 'none';
                const errorMsg = document.createElement('p');
                errorMsg.textContent = \`Panel \${index + 1} no encontrado\`;
                errorMsg.style.color = 'rgba(255,255,255,0.5)';
                slide.appendChild(errorMsg);
            };

            slide.appendChild(img);
            slideContainer.appendChild(slide);
        });

        slides = document.querySelectorAll('.slide');

        updateIndicators();
        updateButtonState();
    }

    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        slides[index].classList.add('active');
        currentSlide = index;

        updateIndicators();
        applyRandomTransition();
        updateButtonState();
    }

    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            showSlide(currentSlide + 1);
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }
    }

    function updateIndicators() {
        indicators.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('indicator');
            if (index === currentSlide) dot.classList.add('active');
            dot.addEventListener('click', () => showSlide(index));
            indicators.appendChild(dot);
        });
    }

    function updateButtonState() {
        prevBtn.disabled = (currentSlide === 0);
        nextBtn.disabled = (currentSlide === slides.length - 1);
    }

    function applyRandomTransition() {
        const randomTransition = transitions[Math.floor(Math.random() * transitions.length)];
        slides[currentSlide].style.animation = \`\${randomTransition} 0.5s ease-in-out\`;
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    // Agregar animaciones de transición
    const style = document.createElement('style');
    style.textContent = \`
        @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideLeft { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slideRight { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes slideDown { from { transform: translateY(-100%); } to { transform: translateY(0); } }
        @keyframes rotate { from { transform: rotate(90deg) scale(0); } to { transform: rotate(0) scale(1); } }
        @keyframes scale { from { transform: scale(0); } to { transform: scale(1); } }
    \`;
    document.head.appendChild(style);

    // Imágenes del cómic (comprimidas en WEBP)
    const imageUrls = [
${arrayContent}    ];

    initSlides();
<\/script>
</body>
</html>`;

            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${this.currentScript.title.replace(/\s+/g, '_').toLowerCase()}_presentacion_comprimida.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error downloading comic:', error);
            alert(this.getTranslation('errorDownloading'));
        } finally {
            this.setLoading(false, 'publish');
        }
    }

    async downloadComicStrip() {
        if (!this.currentScript) {
            alert(this.getTranslation('alertNoComicDownload'));
            return;
        }

        this.setLoading(true, 'downloadComic');

        try {
            // Obtener solo los paneles visibles con imágenes
            const visiblePanels = this.panels.filter((panel, index) => {
                const panelData = this.currentScript.panels[index];
                const hasImage = panel.querySelector('img');
                return hasImage && (!panelData || !panelData.hidden);
            });

            if (visiblePanels.length === 0) {
                alert(this.getTranslation('alertNoImages'));
                return;
            }

            // Convertir imágenes a base64
            const panelPromises = visiblePanels.map(panel => {
                const img = panel.querySelector('img');
                if (img && img.src) {
                    return this.urlToDataUrl(img.src);
                }
                return Promise.resolve(null);
            });

            const panelImageDatas = await Promise.all(panelPromises);
            const validImages = panelImageDatas.filter(img => img !== null);

            if (validImages.length === 0) {
                alert(this.getTranslation('alertNoImages'));
                return;
            }

            // Comprimir imágenes
            const compressedImages = await Promise.all(
                validImages.map(imgData => 
                    this.compressImage(imgData, 0.8, 0.85, 'image/webp')
                )
            );

            // Determinar el número de columnas según la cantidad de paneles
            const panelCount = compressedImages.length;
            let columns = 2; // Por defecto 2 columnas
            if (panelCount === 3 || panelCount === 6) {
                columns = 3;
            } else if (panelCount === 5) {
                columns = 3; // 3 arriba, 2 abajo
            }

            // Crear el HTML del cómic en formato grid
            const aspectRatio = this.settings.aspectRatio || '16:9';
            const aspectRatioMap = {
                '16:9': '16 / 9',
                '1:1': '1 / 1',
                '9:16': '9 / 16'
            };
            const ratio = aspectRatioMap[aspectRatio] || '16 / 9';

            let panelsHTML = '';
            compressedImages.forEach((imgData, index) => {
                panelsHTML += `
                <div class="comic-panel">
                    <div class="panel-number">${index + 1}</div>
                    <img src="${imgData}" alt="Panel ${index + 1}">
                </div>`;
            });

            const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.currentScript.title || 'Tira Cómica'}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        
        .comic-title {
            font-size: 3rem;
            font-weight: 900;
            color: white;
            text-align: center;
            margin-bottom: 2rem;
            text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .comic-container {
            max-width: 1400px;
            width: 100%;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 25px;
            padding: 2rem;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .comic-grid {
            display: grid;
            grid-template-columns: repeat(${columns}, 1fr);
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .comic-panel {
            position: relative;
            aspect-ratio: ${ratio};
            border: 4px solid #333;
            border-radius: 15px;
            overflow: hidden;
            background: linear-gradient(135deg, #f8f9ff 0%, #e8efff 100%);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .comic-panel:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
        }
        
        .panel-number {
            position: absolute;
            top: 12px;
            left: 12px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
            font-weight: 700;
            z-index: 2;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        
        .comic-panel img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            cursor: zoom-in;
        }

        .lightbox {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.85);
            display: none;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            z-index: 9999;
        }

        .lightbox.open {
            display: flex;
        }

        .lightbox img {
            max-width: min(1200px, 96vw);
            max-height: 96vh;
            width: auto;
            height: auto;
            border-radius: 14px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
            cursor: zoom-out;
        }
        
        .footer {
            text-align: center;
            color: rgba(255, 255, 255, 0.9);
            font-size: 0.9rem;
            margin-top: 1rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        @media print {
            body {
                background: white;
                padding: 0;
            }
            
            .comic-container {
                box-shadow: none;
                max-width: 100%;
            }
            
            .comic-panel {
                break-inside: avoid;
            }
            
            .footer {
                color: #666;
                text-shadow: none;
            }

            .lightbox {
                display: none !important;
            }
        }
        
        @media (max-width: 768px) {
            .comic-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
            
            .comic-title {
                font-size: 2rem;
            }
            
            body {
                padding: 1rem;
            }
            
            .comic-container {
                padding: 1rem;
            }
        }
    </style>
</head>
<body>
    <h1 class="comic-title">${this.currentScript.title || 'Tira Cómica'}</h1>
    
    <div class="comic-container">
        <div class="comic-grid">
            ${panelsHTML}
        </div>
    </div>

    <div id="lightbox" class="lightbox" aria-hidden="true">
        <img id="lightboxImg" alt="Panel ampliado">
    </div>
    
    <div class="footer">
        Diseñado por Juan Guillermo Rivera Berrío con tecnología Gemini 2.5 Pro
    </div>

    <script>
        (function () {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightboxImg');
            const panelImages = document.querySelectorAll('.comic-panel img');

            function openLightbox(src, alt) {
                lightboxImg.src = src;
                lightboxImg.alt = alt || 'Panel ampliado';
                lightbox.classList.add('open');
                lightbox.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }

            function closeLightbox() {
                lightbox.classList.remove('open');
                lightbox.setAttribute('aria-hidden', 'true');
                lightboxImg.removeAttribute('src');
                document.body.style.overflow = '';
            }

            panelImages.forEach(img => {
                img.addEventListener('click', () => openLightbox(img.src, img.alt));
            });

            // Requisito: al hacer clic de nuevo sobre la imagen ampliada, se cierra
            lightboxImg.addEventListener('click', closeLightbox);

            // Extra (no rompe el requisito): ESC también cierra
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightbox.classList.contains('open')) {
                    closeLightbox();
                }
            });
        })();
    </script>
</body>
</html>`;

            // Crear y descargar el archivo
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${this.currentScript.title || 'comic'}_tira.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error downloading comic strip:', error);
            alert(this.getTranslation('errorDownloading'));
        } finally {
            this.setLoading(false, 'downloadComic');
        }
    }

    switchToGenerator() {
        this.settingsView.style.display = 'none';
        this.generatorView.style.display = 'block';
        this.generatorTab.classList.add('active');
        this.settingsTab.classList.remove('active');
    }

    switchToSettings() {
        this.generatorView.style.display = 'none';
        this.settingsView.style.display = 'block';
        this.settingsTab.classList.add('active');
        this.generatorTab.classList.remove('active');
    }

    async generateScript(prompt, continuation = false) {
        const model = this.modelSelector.value;
        const selectedPanelCount = parseInt(this.panelCountSelect.value);
        const lang = this.settings.language || 'es';

        // Definir los prompts del sistema en diferentes idiomas
        const systemPrompts = {
            es: {
                writer: 'Eres un escritor de cómics',
                create: `Crea un guion de cómic de ${selectedPanelCount} paneles basado en la idea del usuario`,
                continue: `Continúa una historia de cómic existente con ${selectedPanelCount} paneles más`,
                format: 'Responde con JSON en este formato exacto',
                guidelines: `Pautas:
- Crea un array "characters" con descripciones detalladas de TODOS los personajes que aparecen en el cómic
- Las descripciones de personajes deben ser muy detalladas para una generación de imágenes consistente
- Mantén los diálogos MUY cortos y contundentes (máximo 10 palabras por panel) - se renderizarán como globos de texto en la imagen
- NO incluyas nombres de personajes en el texto del diálogo (ej., escribe "¡Hola!" no "Sarah: ¡Hola!")
- SUBPANELES DINÁMICOS: Para los paneles 2 en adelante, decide aleatoriamente si el panel tendrá subpaneles (2, 3, o 4 subpaneles) o será un panel único. El primer panel SIEMPRE debe ser único (sin subpaneles) para mostrar el título. Si decides usar subpaneles, describe su disposición al inicio de la descripción visual. Ejemplos:
  * "Panel dividido en 2 subpaneles verticales: Izquierda muestra..., Derecha muestra..."
  * "Panel dividido en 3 subpaneles: Panel grande arriba muestra..., 2 paneles pequeños abajo muestran..."
  * "Panel dividido en 4 subpaneles en cuadrícula: Superior izquierda..., Superior derecha..., Inferior izquierda..., Inferior derecha..."
  * O simplemente: "Panel único: [descripción normal]"
- Las descripciones visuales deben ser lo suficientemente detalladas para la generación de imágenes y DEBEN incluir posicionamiento y encuadre de cámara
- REQUISITOS DE CÁMARA: Siempre especifica el ángulo de cámara (primer plano, plano medio, plano general, vista de pájaro, ángulo bajo, ángulo alto, etc.), posicionamiento del personaje (izquierda, derecha, centro, primer plano, fondo), y detalles del campo de visión
- Incluye sugerencias de estilo artístico (caricatura, estilo de cómic, etc.)
- Asegúrate de que la historia tenga un comienzo, desarrollo y final claros a través de ${selectedPanelCount} paneles
- Cada panel debe ser visualmente distinto e interesante con ángulos de cámara variados
- IMPORTANTE: Cuando se mencione un personaje en la descripción visual, incluye su descripción completa en línea
- POSICIONAMIENTO DEL GLOBO DE TEXTO: Cuando haya diálogo, especifica CLARAMENTE qué personaje está hablando y su posición en el encuadre
- CRÍTICO: Solo UN personaje debe hablar por panel. Si varios personajes necesitan hablar, usa paneles separados
- NOTA DE DIÁLOGO: El diálogo se renderizará como un globo de texto directamente en la imagen generada, apuntando al hablante. TODOS los textos deben estar en ESPAÑOL.`,
                continueGuidelines: `Pautas:
- Continúa la historia naturalmente desde donde se quedó
- Puedes actualizar el array de personajes con todos los personajes (existentes + nuevos) con descripciones refinadas
- Los números de panel en la respuesta deben ser 1-${selectedPanelCount} (se renumerarán automáticamente)
- Mantén los diálogos MUY cortos y contundentes (máximo 10 palabras por panel) - se renderizarán como globos de texto en la imagen
- NO incluyas nombres de personajes en el texto del diálogo (ej., escribe "¡Hola!" no "Sarah: ¡Hola!")
- SUBPANELES DINÁMICOS: Decide aleatoriamente si cada panel tendrá subpaneles (2, 3, o 4 subpaneles) o será un panel único. Si decides usar subpaneles, describe su disposición al inicio de la descripción visual. Ejemplos:
  * "Panel dividido en 2 subpaneles verticales: Izquierda muestra..., Derecha muestra..."
  * "Panel dividido en 3 subpaneles: Panel grande arriba muestra..., 2 paneles pequeños abajo muestran..."
  * "Panel dividido en 4 subpaneles en cuadrícula: Superior izquierda..., Superior derecha..., Inferior izquierda..., Inferior derecha..."
  * O simplemente: "Panel único: [descripción normal]"
- Haz que los nuevos paneles avancen la historia de manera significativa
- Cada panel debe ser visualmente distinto e interesante con ángulos de cámara variados
- Las descripciones visuales DEBEN incluir información detallada de posicionamiento y encuadre de cámara
- REQUISITOS DE CÁMARA: Siempre especifica el ángulo de cámara (primer plano, plano medio, plano general, vista de pájaro, ángulo bajo, ángulo alto, etc.), posicionamiento del personaje (izquierda, derecha, centro, primer plano, fondo), y detalles del campo de visión
- Mantén la consistencia con la historia existente
- IMPORTANTE: Cuando se mencione un personaje en la descripción visual, incluye su descripción completa en línea
- Ten en cuenta la indicación/dirección actual del usuario que puede influir en cómo debe continuar la historia
- POSICIONAMIENTO DEL GLOBO DE TEXTO: Cuando haya diálogo, especifica CLARAMENTE qué personaje está hablando y su posición en el encuadre
- CRÍTICO: Solo UN personaje debe hablar por panel. Si varios personajes necesitan hablar, usa paneles separados
- NOTA DE DIÁLOGO: El diálogo se renderizará como un globo de texto directamente en la imagen generada, apuntando al hablante. TODOS los textos deben estar en ESPAÑOL.`
            },
            en: {
                writer: 'You are a comic book writer',
                create: `Create a ${selectedPanelCount}-panel comic script based on the user's prompt`,
                continue: `Continue an existing comic story with ${selectedPanelCount} more panels`,
                format: 'Respond with JSON in this exact format',
                guidelines: `Guidelines:
- Create a "characters" array with detailed descriptions of ALL characters that appear in the comic
- Character descriptions should be very detailed for consistent image generation
- Keep dialogue VERY short and punchy (max 10 words per panel) - it will be rendered as a speech bubble in the image
- DO NOT include character names in the dialogue text itself (e.g., write "Hello there!" not "Sarah: Hello there!")
- DYNAMIC SUBPANELS: For panels 2 onwards, randomly decide if the panel will have subpanels (2, 3, or 4 subpanels) or be a single panel. The first panel MUST always be single (no subpanels) to show the title. If you decide to use subpanels, describe their layout at the beginning of the visual description. Examples:
  * "Panel divided into 2 vertical subpanels: Left shows..., Right shows..."
  * "Panel divided into 3 subpanels: Large panel on top shows..., 2 small panels below show..."
  * "Panel divided into 4 subpanels in grid: Top left..., Top right..., Bottom left..., Bottom right..."
  * Or simply: "Single panel: [normal description]"
- Visual descriptions should be detailed enough for image generation and MUST include camera positioning and framing
- CAMERA REQUIREMENTS: Always specify camera angle (close-up, medium shot, wide shot, bird's eye view, low angle, high angle, etc.), character positioning (left, right, center, foreground, background), and field of view details
- Include art style suggestions (cartoon, comic book style, etc.)
- Make sure the story has a clear beginning, middle, and end across ${selectedPanelCount} panels
- Each panel should be visually distinct and interesting with varied camera angles
- IMPORTANT: Whenever a character is mentioned in the visual description, include their full description inline
- SPEECH BUBBLE POSITIONING: When there is dialogue, CLEARLY specify which character is speaking and their position in the frame
- CRITICAL: Only ONE character should speak per panel. If multiple characters need to speak, use separate panels
- DIALOGUE NOTE: The dialogue will be rendered as a speech bubble directly in the generated image, pointing to the speaker. ALL texts must be in ENGLISH.`,
                continueGuidelines: `Guidelines:
- Continue the story naturally from where it left off
- You can update the characters array with all characters (existing + new) with refined descriptions
- Panel numbers in response should be 1-${selectedPanelCount} (they will be renumbered automatically)
- Keep dialogue VERY short and punchy (max 10 words per panel) - it will be rendered as a speech bubble in the image
- DO NOT include character names in the dialogue text itself (e.g., write "Hello there!" not "Sarah: Hello there!")
- DYNAMIC SUBPANELS: Randomly decide if each panel will have subpanels (2, 3, or 4 subpanels) or be a single panel. If you decide to use subpanels, describe their layout at the beginning of the visual description. Examples:
  * "Panel divided into 2 vertical subpanels: Left shows..., Right shows..."
  * "Panel divided into 3 subpanels: Large panel on top shows..., 2 small panels below show..."
  * "Panel divided into 4 subpanels in grid: Top left..., Top right..., Bottom left..., Bottom right..."
  * Or simply: "Single panel: [normal description]"
- Make the new panels advance the story meaningfully
- Each panel should be visually distinct and interesting with varied camera angles
- Visual descriptions MUST include detailed camera positioning and framing information
- CAMERA REQUIREMENTS: Always specify camera angle (close-up, medium shot, wide shot, bird's eye view, low angle, high angle, etc.), character positioning (left, right, center, foreground, background), and field of view details
- Maintain consistency with the existing story
- IMPORTANT: Whenever a character is mentioned in the visual description, include their full description inline
- Take into account the user's current prompt/direction which may influence how the story should continue
- SPEECH BUBBLE POSITIONING: When there is dialogue, CLEARLY specify which character is speaking and their position in the frame
- CRITICAL: Only ONE character should speak per panel. If multiple characters need to speak, use separate panels
- DIALOGUE NOTE: The dialogue will be rendered as a speech bubble directly in the generated image, pointing to the speaker. ALL texts must be in ENGLISH.`
            },
            fr: {
                writer: 'Vous êtes un scénariste de bande dessinée',
                create: `Créez un scénario de BD de ${selectedPanelCount} cases basé sur l'idée de l'utilisateur`,
                continue: `Continuez une histoire de BD existante avec ${selectedPanelCount} cases supplémentaires`,
                format: 'Répondez avec JSON dans ce format exact',
                guidelines: `Directives:
- Créez un tableau "characters" avec des descriptions détaillées de TOUS les personnages qui apparaissent dans la BD
- Les descriptions des personnages doivent être très détaillées pour une génération d'images cohérente
- Gardez les dialogues TRÈS courts et percutants (max 10 mots par case) - ils seront rendus comme une bulle de texte dans l'image
- N'incluez PAS les noms des personnages dans le texte du dialogue lui-même (par ex., écrivez "Bonjour!" pas "Sarah: Bonjour!")
- SOUS-PANNEAUX DYNAMIQUES: Pour les cases 2 et suivantes, décidez aléatoirement si la case aura des sous-panneaux (2, 3 ou 4 sous-panneaux) ou sera une case unique. La première case DOIT toujours être unique (sans sous-panneaux) pour montrer le titre. Si vous décidez d'utiliser des sous-panneaux, décrivez leur disposition au début de la description visuelle. Exemples:
  * "Case divisée en 2 sous-panneaux verticaux: Gauche montre..., Droite montre..."
  * "Case divisée en 3 sous-panneaux: Grand panneau en haut montre..., 2 petits panneaux en bas montrent..."
  * "Case divisée en 4 sous-panneaux en grille: En haut à gauche..., En haut à droite..., En bas à gauche..., En bas à droite..."
  * Ou simplement: "Case unique: [description normale]"
- Les descriptions visuelles doivent être suffisamment détaillées pour la génération d'images et DOIVENT inclure le positionnement et le cadrage de la caméra
- EXIGENCES DE CAMÉRA: Spécifiez toujours l'angle de caméra (gros plan, plan moyen, plan large, vue d'oiseau, angle bas, angle haut, etc.), le positionnement du personnage (gauche, droite, centre, premier plan, arrière-plan), et les détails du champ de vision
- Incluez des suggestions de style artistique (caricature, style BD, etc.)
- Assurez-vous que l'histoire a un début, un milieu et une fin clairs sur ${selectedPanelCount} cases
- Chaque case doit être visuellement distincte et intéressante avec des angles de caméra variés
- IMPORTANT: Lorsqu'un personnage est mentionné dans la description visuelle, incluez sa description complète en ligne
- POSITIONNEMENT DE LA BULLE DE TEXTE: Lorsqu'il y a un dialogue, spécifiez CLAIREMENT quel personnage parle et sa position dans le cadre
- CRITIQUE: Un seul personnage doit parler par case. Si plusieurs personnages doivent parler, utilisez des cases séparées
- NOTE DE DIALOGUE: Le dialogue sera rendu comme une bulle de texte directement dans l'image générée, pointant vers le locuteur. TOUS les textes doivent être en FRANÇAIS.`,
                continueGuidelines: `Directives:
- Continuez l'histoire naturellement à partir de là où elle s'est arrêtée
- Vous pouvez mettre à jour le tableau des personnages avec tous les personnages (existants + nouveaux) avec des descriptions affinées
- Les numéros de case dans la réponse doivent être 1-${selectedPanelCount} (ils seront renumérotés automatiquement)
- Gardez les dialogues TRÈS courts et percutants (max 10 mots par case) - ils seront rendus comme une bulle de texte dans l'image
- N'incluez PAS les noms des personnages dans le texte du dialogue lui-même (par ex., écrivez "Bonjour!" pas "Sarah: Bonjour!")
- SOUS-PANNEAUX DYNAMIQUES: Décidez aléatoirement si chaque case aura des sous-panneaux (2, 3 ou 4 sous-panneaux) ou sera une case unique. Si vous décidez d'utiliser des sous-panneaux, décrivez leur disposition au début de la description visuelle. Exemples:
  * "Case divisée en 2 sous-panneaux verticaux: Gauche montre..., Droite montre..."
  * "Case divisée en 3 sous-panneaux: Grand panneau en haut montre..., 2 petits panneaux en bas montrent..."
  * "Case divisée en 4 sous-panneaux en grille: En haut à gauche..., En haut à droite..., En bas à gauche..., En bas à droite..."
  * Ou simplement: "Case unique: [description normale]"
- Faites en sorte que les nouvelles cases fassent avancer l'histoire de manière significative
- Chaque case doit être visuellement distincte et intéressante avec des angles de caméra variés
- Les descriptions visuelles DOIVENT inclure des informations détaillées sur le positionnement et le cadrage de la caméra
- EXIGENCES DE CAMÉRA: Spécifiez toujours l'angle de caméra (gros plan, plan moyen, plan large, vue d'oiseau, angle bas, angle haut, etc.), le positionnement du personnage (gauche, droite, centre, premier plan, arrière-plan), et les détails du champ de vision
- Maintenez la cohérence avec l'histoire existante
- IMPORTANT: Lorsqu'un personnage est mentionné dans la description visuelle, incluez sa description complète en ligne
- Tenez compte de l'indication/direction actuelle de l'utilisateur qui peut influencer la façon dont l'histoire doit continuer
- POSITIONNEMENT DE LA BULLE DE TEXTE: Lorsqu'il y a un dialogue, spécifiez CLAIREMENT quel personnage parle et sa position dans le cadre
- CRITIQUE: Un seul personnage doit parler par case. Si plusieurs personnages doivent parler, utilisez des cases séparées
- NOTE DE DIALOGUE: Le dialogue sera rendu comme une bulle de texte directement dans l'image générée, pointant vers le locuteur. TOUS les textes doivent être en FRANÇAIS.`
            }
        };

        const langPrompts = systemPrompts[lang] || systemPrompts['es'];

        const panelArray = Array.from({ length: selectedPanelCount }, (_, i) => `
    {
      "panel_number": ${i + 1},
      "visual_description": "...",
      "dialogue": "..."
    }`).join(',');

        let systemPrompt = `${langPrompts.writer}. ${langPrompts.create}.\n\n${langPrompts.format}:
{
  "title": "Comic Title",
  "characters": [
    {
      "name": "Character Name",
      "description": "Detailed visual description of the character including appearance, clothing, distinctive features"
    }
  ],
  "panels": [${panelArray}
  ]
}

${langPrompts.guidelines}`;

        let userPrompt = '';
        if (continuation) {
            const currentPrompt = this.promptInput.value.trim();
            systemPrompt = `${langPrompts.writer}. ${langPrompts.continue}.

${langPrompts.format}:
{
  "characters": [
    {
      "name": "Character Name", 
      "description": "Detailed visual description"
    }
  ],
  "panels": [${panelArray}
  ]
}

${langPrompts.continueGuidelines}`;
            userPrompt = `Continue this comic story with ${selectedPanelCount} more panels. 

Current user prompt/direction: "${currentPrompt}"

Existing story so far:

${JSON.stringify(this.currentScript, null, 2)}`;
        } else {
            userPrompt = prompt;
        }

        const url = `https://gen.pollinations.ai/v1/chat/completions`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.settings.apiKey}`
            },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                model: model
            }),
            signal: this.abortController?.signal // Add abort signal
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || '';

        try {
            const cleanContent = this.extractJsonContent(content);
            return JSON.parse(cleanContent);
        } catch (error) {
            console.error("Failed to parse JSON from API response:", content);
            throw new Error("The API did not return valid JSON. Check the console for the raw response.");
        }
    }

    async generatePanel(panelIndex, panelData, script, seed = null) {
        const panel = this.panels[panelIndex];
        panel.classList.add('generating');

        const placeholder = panel.querySelector('.panel-placeholder');
        placeholder.style.display = 'none';

        let hasError = false;

        try {
            const artStyleTag = this.getArtStyleTag();

            // Descripción visual base
            let visualDescription = panelData.visual_description || '';

            // Agregar solo la primera oración de la descripción de cada personaje mencionado
            if (script.characters && script.characters.length > 0) {
                const lowerVisual = visualDescription.toLowerCase();
                const lowerDialogue = (panelData.dialogue || '').toLowerCase();
                const mentions = [];

                script.characters.forEach(character => {
                    const charNameLower = character.name.toLowerCase();
                    if (lowerVisual.includes(charNameLower) || lowerDialogue.includes(charNameLower)) {
                        const shortDesc = character.description.split('.')[0].trim();
                        mentions.push(`${character.name}: ${shortDesc}`);
                    }
                });

                if (mentions.length > 0) {
                    visualDescription = mentions.join('. ') + '. ' + visualDescription;
                }
            }

            // Construir prompt conciso
            const parts = [];
            if (artStyleTag) parts.push(artStyleTag);
            parts.push(`Comic panel: ${visualDescription}`);
            if (panelIndex === 0 && script.title) {
                parts.push(`Title: "${script.title}" in bold comic letters`);
            }
            if (panelData.dialogue && panelData.dialogue.trim()) {
                parts.push(`Speech bubble: "${panelData.dialogue}"`);
            }

            const fullPrompt = parts.join('. ');
            console.log(`Panel ${panelIndex + 1} prompt (${fullPrompt.length} chars):`, fullPrompt);

            let result;
            if (this.settings.imageApi === 'pollinations') {
                result = await this.generateImagePollinations(fullPrompt, panelIndex, seed);
            } else {
                result = await this.generateImageWebsim(fullPrompt, panelIndex);
            }

            const img = document.createElement('img');
            img.src = result.url;
            img.alt = `Panel ${panelIndex + 1}`;

            img.onerror = () => {
                console.error(`Error loading image for panel ${panelIndex + 1}`);
                img.remove();
                hasError = true;
                this.showPanelError(panel, panelIndex, panelData, script);
            };

            img.onload = () => {
                panel.classList.remove('panel-error');
                placeholder.style.display = 'none';
            };

            const existingImg = panel.querySelector('img');
            if (existingImg) existingImg.remove();

            panel.appendChild(img);

            const speechBubble = panel.querySelector('.speech-bubble');
            speechBubble.classList.remove('visible');

        } catch (error) {
            console.error(`Error generating panel ${panelIndex + 1}:`, error);
            hasError = true;
            this.showPanelError(panel, panelIndex, panelData, script, error);

        } finally {
            panel.classList.remove('generating');
        }
    }

    showPanelError(panel, panelIndex, panelData, script, error = null) {
        const placeholder = panel.querySelector('.panel-placeholder');
        
        let errorMessage = this.getTranslation('errorGeneratingPanel') || `Error al generar el panel ${panelIndex + 1}`;
        if (error && error.message) {
            errorMessage += `\n${error.message}`;
        }

        placeholder.innerHTML = `
            <div style="text-align: center; padding: 1rem;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">⚠️</div>
                <div style="font-size: 0.9rem; margin-bottom: 1rem; color: #d32f2f; white-space: pre-line;">${errorMessage}</div>
                <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin-bottom: 0.5rem;">
                    <button class="retry-panel-btn" style="
                        padding: 0.5rem 1rem;
                        background: linear-gradient(45deg, #667eea, #764ba2);
                        color: white;
                        border: none;
                        border-radius: 15px;
                        cursor: pointer;
                        font-family: 'Space Mono', monospace;
                        font-size: 0.9rem;
                        font-weight: 700;
                        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
                        transition: all 0.3s ease;
                    ">
                        🔄 ${this.getTranslation('retryPanel') || 'Reintentar'}
                    </button>
                    <button class="simplify-panel-btn" style="
                        padding: 0.5rem 1rem;
                        background: linear-gradient(45deg, #28a745, #20c997);
                        color: white;
                        border: none;
                        border-radius: 15px;
                        cursor: pointer;
                        font-family: 'Space Mono', monospace;
                        font-size: 0.9rem;
                        font-weight: 700;
                        box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
                        transition: all 0.3s ease;
                    ">
                        ✨ ${this.getTranslation('simplifyPanel') || 'Simplificar'}
                    </button>
                    <button class="edit-panel-btn" style="
                        padding: 0.5rem 1rem;
                        background: linear-gradient(45deg, #f39c12, #f1c40f);
                        color: white;
                        border: none;
                        border-radius: 15px;
                        cursor: pointer;
                        font-family: 'Space Mono', monospace;
                        font-size: 0.9rem;
                        font-weight: 700;
                        box-shadow: 0 4px 12px rgba(243, 156, 18, 0.3);
                        transition: all 0.3s ease;
                    ">
                        ✏️ ${this.getTranslation('editPanel') || 'Editar'}
                    </button>
                    <button class="hide-panel-btn" style="
                        padding: 0.5rem 1rem;
                        background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
                        color: white;
                        border: none;
                        border-radius: 15px;
                        cursor: pointer;
                        font-family: 'Space Mono', monospace;
                        font-size: 0.9rem;
                        font-weight: 700;
                        box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
                        transition: all 0.3s ease;
                    ">
                        🗑️ ${this.getTranslation('hidePanel') || 'Ocultar'}
                    </button>
                </div>
                <details style="margin-top: 0.5rem; text-align: left; font-size: 0.8rem; color: #666;">
                    <summary style="cursor: pointer; font-weight: 700; margin-bottom: 0.5rem;">${this.getTranslation('viewDescription') || 'Ver descripción actual'}</summary>
                    <div style="background: rgba(0,0,0,0.05); padding: 0.5rem; border-radius: 8px; max-height: 100px; overflow-y: auto;">
                        ${panelData.visual_description || 'Sin descripción'}
                    </div>
                </details>
            </div>
        `;
        placeholder.style.display = 'block';
        placeholder.style.cursor = 'default';

        panel.classList.add('panel-error');

        // Agregar evento al botón de reintentar
        const retryBtn = placeholder.querySelector('.retry-panel-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                if (panel.classList.contains('generating')) {
                    return;
                }
                
                const newSeed = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
                
                try {
                    await this.generatePanel(panelIndex, panelData, script, newSeed);
                } catch (error) {
                    console.error(`Error retrying panel ${panelIndex + 1}:`, error);
                }
            });

            this.addButtonHoverEffects(retryBtn, 'rgba(102, 126, 234, 0.3)', 'rgba(102, 126, 234, 0.4)');
        }

        // Agregar evento al botón de simplificar
        const simplifyBtn = placeholder.querySelector('.simplify-panel-btn');
        if (simplifyBtn) {
            simplifyBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                if (panel.classList.contains('generating')) {
                    return;
                }
                
                const simplifiedData = { ...panelData };
                simplifiedData.visual_description = this.simplifyVisualDescription(panelData.visual_description);
                
                // Actualizar el script con la descripción simplificada
                if (this.currentScript && this.currentScript.panels[panelIndex]) {
                    this.currentScript.panels[panelIndex].visual_description = simplifiedData.visual_description;
                }
                
                const newSeed = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
                
                try {
                    await this.generatePanel(panelIndex, simplifiedData, script, newSeed);
                } catch (error) {
                    console.error(`Error generating simplified panel ${panelIndex + 1}:`, error);
                }
            });

            this.addButtonHoverEffects(simplifyBtn, 'rgba(40, 167, 69, 0.3)', 'rgba(40, 167, 69, 0.4)');
        }

        // Agregar evento al botón de editar
        const editBtn = placeholder.querySelector('.edit-panel-btn');
        if (editBtn) {
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showEditPanelDialog(panel, panelIndex, panelData, script);
            });

            this.addButtonHoverEffects(editBtn, 'rgba(243, 156, 18, 0.3)', 'rgba(243, 156, 18, 0.4)');
        }

        // Agregar evento al botón de ocultar
        const hideBtn = placeholder.querySelector('.hide-panel-btn');
        if (hideBtn) {
            hideBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                
                if (confirm(this.getTranslation('confirmHidePanel') || '¿Estás seguro de que quieres ocultar este panel? Podrás mostrarlo de nuevo editando el guion.')) {
                    panel.style.display = 'none';
                    
                    if (this.currentScript && this.currentScript.panels[panelIndex]) {
                        this.currentScript.panels[panelIndex].hidden = true;
                    }
                }
            });

            this.addButtonHoverEffects(hideBtn, 'rgba(255, 107, 107, 0.3)', 'rgba(255, 107, 107, 0.4)');
        }
    }

    showEditPanelDialog(panel, panelIndex, panelData, script) {
        const currentDescription = panelData.visual_description || '';
        const currentDialogue = panelData.dialogue || '';
        
        const dialogHtml = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                padding: 1rem;
            " id="editPanelDialog">
                <div style="
                    background: white;
                    border-radius: 20px;
                    padding: 2rem;
                    max-width: 600px;
                    width: 100%;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                ">
                    <h2 style="margin-top: 0; color: #333;">${this.getTranslation('editPanelTitle') || 'Editar Panel'} ${panelIndex + 1}</h2>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; font-weight: 700; margin-bottom: 0.5rem; color: #333;">
                            ${this.getTranslation('visualDescription') || 'Descripción Visual:'}
                        </label>
                        <textarea id="editPanelDescription" style="
                            width: 100%;
                            min-height: 150px;
                            padding: 0.75rem;
                            border: 2px solid #ddd;
                            border-radius: 10px;
                            font-family: 'Space Mono', monospace;
                            font-size: 0.9rem;
                            resize: vertical;
                        ">${currentDescription}</textarea>
                        <div style="font-size: 0.8rem; color: #666; margin-top: 0.5rem;">
                            💡 ${this.getTranslation('editTip') || 'Consejo: Usa descripciones simples. Evita detalles técnicos como "pantalla muestra icono de..." o "desenfocado para..."'}
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; font-weight: 700; margin-bottom: 0.5rem; color: #333;">
                            ${this.getTranslation('dialogue') || 'Diálogo:'} (${this.getTranslation('optional') || 'opcional'})
                        </label>
                        <input type="text" id="editPanelDialogue" style="
                            width: 100%;
                            padding: 0.75rem;
                            border: 2px solid #ddd;
                            border-radius: 10px;
                            font-family: 'Space Mono', monospace;
                            font-size: 0.9rem;
                        " value="${currentDialogue}" maxlength="100">
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                        <button id="cancelEditPanel" style="
                            padding: 0.75rem 1.5rem;
                            background: #6c757d;
                            color: white;
                            border: none;
                            border-radius: 15px;
                            cursor: pointer;
                            font-family: 'Space Mono', monospace;
                            font-weight: 700;
                        ">
                            ${this.getTranslation('cancel') || 'Cancelar'}
                        </button>
                        <button id="saveEditPanel" style="
                            padding: 0.75rem 1.5rem;
                            background: linear-gradient(45deg, #667eea, #764ba2);
                            color: white;
                            border: none;
                            border-radius: 15px;
                            cursor: pointer;
                            font-family: 'Space Mono', monospace;
                            font-weight: 700;
                            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
                        ">
                            ${this.getTranslation('saveAndGenerate') || 'Guardar y Generar'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', dialogHtml);
        
        const dialog = document.getElementById('editPanelDialog');
        const cancelBtn = document.getElementById('cancelEditPanel');
        const saveBtn = document.getElementById('saveEditPanel');
        const descriptionInput = document.getElementById('editPanelDescription');
        const dialogueInput = document.getElementById('editPanelDialogue');
        
        cancelBtn.addEventListener('click', () => {
            dialog.remove();
        });
        
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                dialog.remove();
            }
        });
        
        saveBtn.addEventListener('click', async () => {
            const newDescription = descriptionInput.value.trim();
            const newDialogue = dialogueInput.value.trim();
            
            if (!newDescription) {
                alert(this.getTranslation('alertNoDescription') || 'La descripción visual no puede estar vacía');
                return;
            }
            
            // Actualizar los datos del panel
            panelData.visual_description = newDescription;
            panelData.dialogue = newDialogue;
            
            // Actualizar el script
            if (this.currentScript && this.currentScript.panels[panelIndex]) {
                this.currentScript.panels[panelIndex].visual_description = newDescription;
                this.currentScript.panels[panelIndex].dialogue = newDialogue;
                this.displayScript(this.currentScript);
            }
            
            dialog.remove();
            
            // Generar el panel con la nueva descripción
            const newSeed = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
            
            try {
                await this.generatePanel(panelIndex, panelData, script, newSeed);
            } catch (error) {
                console.error(`Error generating edited panel ${panelIndex + 1}:`, error);
            }
        });
        
        // Focus en el textarea
        descriptionInput.focus();
        descriptionInput.setSelectionRange(descriptionInput.value.length, descriptionInput.value.length);
    }

    addButtonHoverEffects(button, normalShadow, hoverShadow) {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = `0 6px 16px ${hoverShadow}`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = `0 4px 12px ${normalShadow}`;
        });
    }

    simplifyVisualDescription(description) {
        // Simplificación agresiva para descripciones problemáticas
        let simplified = description;
        
        // Eliminar referencias a pantallas digitales con contenido específico
        simplified = simplified.replace(/pantalla digital.*?muestra.*?(\.|,|$)/gi, 'pantalla digital. ');
        simplified = simplified.replace(/pantalla.*?muestra.*?icono.*?(\.|,|$)/gi, 'pantalla iluminada. ');
        
        // Eliminar iconos y símbolos específicos
        simplified = simplified.replace(/icono de.*?(\.|,|$)/gi, '');
        simplified = simplified.replace(/símbolo de.*?(\.|,|$)/gi, '');
        
        // Simplificar expresiones faciales complejas
        simplified = simplified.replace(/cara sonriente con.*?(\.|,|$)/gi, 'expresión alegre. ');
        simplified = simplified.replace(/expresión.*?con.*?gafas.*?(\.|,|$)/gi, 'expresión contenta. ');
        
        // Eliminar detalles excesivos sobre desenfoque y efectos
        simplified = simplified.replace(/están desenfocados.*?(\.|,|$)/gi, 'en el fondo. ');
        simplified = simplified.replace(/desenfocados para.*?(\.|,|$)/gi, 'en el fondo. ');
        simplified = simplified.replace(/para resaltar.*?(\.|,|$)/gi, '');
        
        // Eliminar instrucciones técnicas de renderizado
        simplified = simplified.replace(/con efecto de.*?(\.|,|$)/gi, '');
        simplified = simplified.replace(/renderizado.*?(\.|,|$)/gi, '');
        simplified = simplified.replace(/iluminación.*?para.*?(\.|,|$)/gi, 'bien iluminado. ');
        
        // Simplificar descripciones de objetos complejos
        simplified = simplified.replace(/muestra ahora.*?(\.|,|$)/gi, 'muestra. ');
        simplified = simplified.replace(/ahora.*?(\.|,|$)/gi, '');
        
        // Eliminar paréntesis con detalles de posicionamiento excesivos
        simplified = simplified.replace(/\(en el centro del encuadre\)/gi, '');
        simplified = simplified.replace(/\(a la izquierda\)/gi, '');
        simplified = simplified.replace(/\(a la derecha\)/gi, '');
        
        // Limpiar espacios múltiples y puntuación redundante
        simplified = simplified.replace(/\s+/g, ' ').trim();
        simplified = simplified.replace(/\.\s*\./g, '.');
        simplified = simplified.replace(/,\s*,/g, ',');
        simplified = simplified.replace(/\s+,/g, ',');
        simplified = simplified.replace(/\s+\./g, '.');
        
        // Si la descripción quedó muy corta, agregar contexto básico
        if (simplified.length < 50) {
            simplified = `Escena de cómic. ${simplified}`;
        }
        
        return simplified;
    }

    async regeneratePanelImage(panelIndex) {
        if (!this.validateApiKey()) {
            return;
        }

        if (!this.currentScript || !this.currentScript.panels[panelIndex]) {
            return;
        }
        const seed = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

        const panel = this.panels[panelIndex];
        panel.classList.remove('panel-error');

        this.currentArtStyle = this.artStyleSelect.value;
        this.currentImgToImg = this.imgToImgCheck.checked;

        try {
            await this.generatePanel(panelIndex, this.currentScript.panels[panelIndex], this.currentScript, seed);
        } catch (error) {
            console.error(`Error regenerating panel ${panelIndex + 1}:`, error);
        }
    }

    async generateImageWebsim(fullPrompt, panelIndex) {
        const aspectRatio = this.settings.aspectRatio || '16:9';
        
        if (this.currentImgToImg) {
            const whiteImageDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hGgAHggJ/PchI7wAAAABJRU5ErkJggg==';

            return await websim.imageGen({
                prompt: fullPrompt,
                aspect_ratio: aspectRatio,
                image_inputs: [
                    {
                        url: whiteImageDataUrl
                    }
                ]
            });
        }

        return await websim.imageGen({
            prompt: fullPrompt,
            aspect_ratio: aspectRatio
        });
    }

    async generateImagePollinations(fullPrompt, panelIndex, seed = null) {
        const model = this.settings.pollinationsModel || 'flux';
        const aspectRatio = this.settings.aspectRatio || '16:9';

        // Modelos que requieren dimensiones mínimas de 1024px
        const highReqModels = ['gptimage', 'seedream', 'seedream-pro', 'kontext', 'flux-2-dev', 'nanobanana-pro'];
        const isHighReq = highReqModels.includes(model);

        // GPT Image solo acepta dimensiones fijas específicas
        const isGptImage = model === 'gptimage';

        let width, height;
        if (isGptImage) {
            // gpt-image-1: solo acepta 1024x1024, 1536x1024, 1024x1536
            if (aspectRatio === '16:9')     { width = 1536; height = 1024; }
            else if (aspectRatio === '9:16') { width = 1024; height = 1536; }
            else                             { width = 1024; height = 1024; }
        } else if (isHighReq) {
            // Seedream y similares: mínimo 1024px
            if (aspectRatio === '16:9')     { width = 1600; height = 900;  }
            else if (aspectRatio === '9:16') { width = 900;  height = 1600; }
            else                             { width = 1024; height = 1024; }
        } else {
            // Flux y modelos estándar: dimensiones ligeras
            if (aspectRatio === '16:9')     { width = 800; height = 450; }
            else if (aspectRatio === '9:16') { width = 450; height = 800; }
            else                             { width = 600; height = 600; }
        }

        if (!seed) {
            seed = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
        }

        const encodedPrompt = encodeURIComponent(fullPrompt);
        const url = `https://enter.pollinations.ai/api/generate/image/${encodedPrompt}?key=${this.settings.apiKey}&model=${model}&width=${width}&height=${height}&seed=${seed}&enhance=true&nlogo=true&private=true&safe=false`;
        return { url };
    }

    async urlToDataUrl(url) {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    getAspectRatioStyles(aspectRatio) {
        const styles = {
            '16:9': {
                container: `
                    width: min(90vw, 1920px);
                    height: min(calc(90vw * 9 / 16), 1080px);
                `,
                image: `
                    max-width: 95%;
                    max-height: 80%;
                `
            },
            '1:1': {
                container: `
                    width: min(80vh, 1080px);
                    height: min(80vh, 1080px);
                `,
                image: `
                    max-width: 90%;
                    max-height: 85%;
                `
            },
            '9:16': {
                container: `
                    width: min(calc(80vh * 9 / 16), 607px);
                    height: min(80vh, 1080px);
                `,
                image: `
                    max-width: 90%;
                    max-height: 85%;
                `
            }
        };

        return styles[aspectRatio] || styles['16:9'];
    }

    displayScript(script) {
        this.scriptOutput.contentEditable = true;
        this.scriptOutput.style.cursor = 'text';
        this.scriptOutput.textContent = JSON.stringify(script, null, 2);

        // Mostrar el botón de actualizar guión
        if (this.updateScriptBtn) {
            this.updateScriptBtn.style.display = 'block';
        }

        this.scriptOutput.addEventListener('input', () => this.handleScriptEdit());
        this.scriptOutput.addEventListener('blur', () => this.handleScriptEdit());
        this.scriptOutput.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                document.execCommand('insertText', false, '  ');
            }
            if (e.key === 'Enter' && e.ctrlKey) {
                e.preventDefault();
                this.handleScriptEdit();
            }
        });
    }

    handleScriptEdit() {
        try {
            const editedText = this.scriptOutput.textContent;
            const parsedScript = JSON.parse(editedText);

            if (!parsedScript.panels || !Array.isArray(parsedScript.panels)) {
                throw new Error('Script must have a "panels" array');
            }

            this.currentScript = parsedScript;

            this.updatePanelsFromScript();

            this.scriptOutput.style.borderColor = '';
            this.scriptOutput.style.backgroundColor = '';

        } catch (error) {
            console.warn('Script parsing error:', error);

            this.scriptOutput.style.borderColor = '#dc3545';
            this.scriptOutput.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
        }
    }

    async updateScriptChanges() {
        if (!this.currentScript || !this.currentScript.panels) {
            alert(this.getTranslation('alertNoScript') || 'No hay guión para actualizar');
            return;
        }

        // Verificar qué paneles tienen imágenes generadas
        const panelsToUpdate = [];
        this.currentScript.panels.forEach((panelData, index) => {
            const panel = this.panels[index];
            if (panel && panel.querySelector('img')) {
                panelsToUpdate.push({ index, panelData });
            }
        });

        if (panelsToUpdate.length === 0) {
            alert(this.getTranslation('alertNoPanelsToUpdate') || 'No hay paneles con imágenes para actualizar');
            return;
        }

        const confirmMsg = this.getTranslation('confirmUpdateScript') || 
            `¿Actualizar ${panelsToUpdate.length} panel(es) con los cambios del guión? Esto regenerará solo los paneles que ya tienen imágenes.`;
        
        if (!confirm(confirmMsg)) {
            return;
        }

        this.isGenerating = true;
        this.setLoading(true, 'update');
        this.updateProgress(0, this.getTranslation('updatingPanels') || 'Actualizando paneles...');
        this.showCancelButton();

        try {
            for (let i = 0; i < panelsToUpdate.length; i++) {
                if (this.cancelRequested) break;
                
                const { index, panelData } = panelsToUpdate[i];
                
                this.updateProgress(
                    (i * 100) / panelsToUpdate.length, 
                    `${this.getTranslation('updatingPanel') || 'Actualizando panel'} ${index + 1}...`
                );
                
                const newSeed = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
                await this.generatePanel(index, panelData, this.currentScript, newSeed);
                
                if (this.cancelRequested) break;
                
                this.updateProgress(
                    ((i + 1) * 100) / panelsToUpdate.length, 
                    `${this.getTranslation('panelUpdated') || 'Panel actualizado'} ${index + 1}`
                );
            }

            if (!this.cancelRequested) {
                this.updateProgress(100, this.getTranslation('updateCompleted') || '¡Actualización completada!');
            }

        } catch (error) {
            if (!this.cancelRequested) {
                console.error('Error updating panels:', error);
                this.updateProgress(0, this.getTranslation('errorUpdating') || 'Error al actualizar los paneles');
            }
        } finally {
            this.isGenerating = false;
            this.setLoading(false, 'update');
            this.hideCancelButton();
        }
    }

    updatePanelsFromScript() {
        if (!this.currentScript || !this.currentScript.panels) {
            return;
        }

        const scriptPanels = this.currentScript.panels;

        this.ensurePanelCount(scriptPanels.length);

        scriptPanels.forEach((panelData, index) => {
            if (this.panels[index]) {
                const panel = this.panels[index];
                const speechBubble = panel.querySelector('.speech-bubble');

                // El diálogo ahora está integrado en la imagen, no se muestra como HTML
                speechBubble.classList.remove('visible');

                const panelNumber = panel.querySelector('.panel-number');
                if (panelNumber && panelData.panel_number) {
                    panelNumber.textContent = panelData.panel_number;
                }

                const existingImg = panel.querySelector('img');
                const placeholder = panel.querySelector('.panel-placeholder');

                if (!existingImg) {
                    placeholder.style.display = 'block';
                    placeholder.textContent = `Panel ${index + 1} - Click to generate`;
                    placeholder.style.cursor = 'pointer';

                    const existingHandler = panel._generateClickHandler;
                    if (existingHandler) {
                        panel.removeEventListener('click', existingHandler);
                    }

                    const generateClickHandler = async (e) => {
                        e.stopPropagation();
                        if (panel.classList.contains('generating') || this.isGenerating) {
                            return;
                        }

                        this.currentArtStyle = this.artStyleSelect.value;
                        this.currentImgToImg = this.imgToImgCheck.checked;

                        try {
                            await this.generatePanel(index, scriptPanels[index], this.currentScript);
                            panel.removeEventListener('click', generateClickHandler);
                            panel._generateClickHandler = null;
                            placeholder.style.cursor = 'default';
                        } catch (error) {
                            console.error(`Error generating panel ${index + 1}:`, error);
                        }
                    };

                    panel._generateClickHandler = generateClickHandler;
                    panel.addEventListener('click', generateClickHandler);
                }
            }
        });

        for (let i = scriptPanels.length; i < this.panels.length; i++) {
            if (this.panels[i]) {
                this.panels[i].style.display = 'none';
            }
        }

        for (let i = 0; i < scriptPanels.length; i++) {
            if (this.panels[i]) {
                this.panels[i].style.display = 'block';
            }
        }
    }

    updateProgress(percentage, text) {
        this.progressFill.style.width = `${percentage}%`;
        this.progressText.textContent = text;
    }

    setLoading(loading, buttonType = 'generate') {
        let button;
        if (buttonType === 'generate') {
            button = this.generateBtn;
        } else if (buttonType === 'continue') {
            button = this.continueBtn;
        } else if (buttonType === 'regenerate') {
            button = this.regenerateBtn;
        } else if (buttonType === 'publish') {
            button = this.publishBtn;
        } else if (buttonType === 'downloadComic') {
            button = this.downloadComicBtn;
        } else if (buttonType === 'update') {
            button = this.updateScriptBtn;
        }

        if (button) {
            button.disabled = loading;
            if (loading) {
                button.classList.add('loading');
            } else {
                button.classList.remove('loading');
            }
        }
    }

    getArtStyleTag() {
        const artStyle = this.artStyleSelect.value;
        console.log('getArtStyleTag - artStyle:', artStyle); // Debug
        if (artStyle === 'custom') {
            const customStyle = this.customStyleInput.value.trim();
            console.log('getArtStyleTag - customStyle:', customStyle); // Debug
            return customStyle || '';
        }

        const styleMap = {
            'cartoon': 'Cartoon style art, animated style, vibrant colors, bold outlines, simplified features, stylized character design, cel-shaded, Disney-style animation',
            'realistic': 'Photorealistic style, hyperrealistic, detailed textures, natural lighting, high detail, lifelike, photography-style, realistic proportions, fine details',
            'anime': 'Anime style art, manga illustration, Japanese animation style, large expressive eyes, detailed hair shading, anime character design, cel-shaded anime, studio anime quality',
            'comic': 'Comic book art style, superhero comic style, dynamic poses, bold colors, dramatic lighting, ink outlines, halftone patterns, action-oriented, Marvel/DC comic style',
            'watercolor': 'Watercolor painting style, soft brushstrokes, flowing colors, artistic paper texture, painterly effect, traditional watercolor medium, gentle color bleeding',
            'sketch': 'Hand-drawn sketch style, pencil drawing, charcoal sketch, rough lines, artistic hatching, traditional drawing medium, sketchy linework, crosshatching',
            'none': ''
        };
        return styleMap[artStyle] || '';
    }

    getArtStyleForAI() {
        const artStyle = this.artStyleSelect.value;
        console.log('getArtStyleForAI - artStyle:', artStyle); // Debug
        if (artStyle === 'custom') {
            const customStyle = this.customStyleInput.value.trim();
            console.log('getArtStyleForAI - customStyle:', customStyle); // Debug
            return customStyle || '';
        }

        const styleMap = {
            'cartoon': 'Cartoon style art, animated style, vibrant colors, bold outlines, simplified features, stylized character design, cel-shaded, Disney-style animation',
            'realistic': 'Photorealistic style, hyperrealistic, detailed textures, natural lighting, high detail, lifelike, photography-style, realistic proportions, fine details',
            'anime': 'Anime style art, manga illustration, Japanese animation style, large expressive eyes, detailed hair shading, anime character design, cel-shaded anime, studio anime quality',
            'comic': 'Comic book art style, superhero comic style, dynamic poses, bold colors, dramatic lighting, ink outlines, halftone patterns, action-oriented, Marvel/DC comic style',
            'watercolor': 'Watercolor painting style, soft brushstrokes, flowing colors, artistic paper texture, painterly effect, traditional watercolor medium, gentle color bleeding',
            'sketch': 'Hand-drawn sketch style, pencil drawing, charcoal sketch, rough lines, artistic hatching, traditional drawing medium, sketchy linework, crosshatching',
            'none': ''
        };
        return styleMap[artStyle] || '';
    }

    async regenerateImages() {
        if (!this.currentScript || !this.currentScript.panels) {
            alert(this.getTranslation('alertNoComic'));
            return;
        }

        this.isGenerating = true;
        this.cancelRequested = false;
        this.abortController = new AbortController();
        this.setLoading(true, 'regenerate');
        this.updateProgress(0, this.getTranslation('regeneratingImages'));
        this.showCancelButton();

        try {
            const totalPanels = this.panels.length;

            for (let i = 0; i < totalPanels; i++) {
                if (this.cancelRequested) break;
                if (!this.currentScript.panels[i]) continue;

                this.updateProgress(i * (100 / totalPanels), `${this.getTranslation('regeneratingPanel')} ${i + 1}...`);
                await this.generatePanel(i, this.currentScript.panels[i], this.currentScript);
                if (this.cancelRequested) break;

                this.updateProgress((i + 1) * (100 / totalPanels), this.getTranslation('panelRegenerated').replace('{0}', i + 1));
            }

            if (!this.cancelRequested) {
                this.updateProgress(100, this.getTranslation('regenerationCompleted'));
            }

        } catch (error) {
            if (!this.cancelRequested) {
                console.error('Error regenerating images:', error);
                let errorMessage = this.getTranslation('errorRegenerating');
                if (error.message) {
                    errorMessage += `\n\nDetalles del error: ${error.message}`;
                }
                this.updateProgress(0, errorMessage);
            }
        } finally {
            this.isGenerating = false;
            this.abortController = null;
            this.setLoading(false, 'regenerate');
            this.hideCancelButton();
        }
    }

    clearAll() {
        this.customStyleInput.value = '';
        this.customStyleRow.style.display = 'none';
        this.imgToImgCheck.checked = false;

        this.currentScript = null;
        this.currentImgToImg = false;
        this.panelCount = parseInt(this.panelCountSelect.value);

        this.clearExistingPanels();

        this.scriptOutput.textContent = '';

        this.continueBtn.style.display = 'none';
        this.regenerateBtn.style.display = 'none';
        this.downloadButtonsContainer.style.display = 'none';

        this.updateProgress(0, this.getTranslation('readyToGenerate'));
    }

    cancelGeneration() {
        this.cancelRequested = true;

        if (this.abortController) {
            this.abortController.abort();
        }

        this.isGenerating = false;
        this.setLoading(false, 'generate');
        this.setLoading(false, 'continue');
        this.setLoading(false, 'regenerate');
        this.hideCancelButton();

        this.panels.forEach(panel => {
            panel.classList.remove('generating');
        });

        this.updateProgress(0, this.getTranslation('generationCancelled'));
    }

    showCancelButton() {
        this.cancelBtn.style.display = 'block';
        this.downloadButtonsContainer.style.display = 'none';
        this.clearBtn.style.display = 'none';
    }

    hideCancelButton() {
        this.cancelBtn.style.display = 'none';
        this.clearBtn.style.display = 'block';
        if (this.currentScript && !this.cancelRequested) {
            this.regenerateBtn.style.display = 'block';
            this.downloadButtonsContainer.style.display = 'flex';
        }
    }

    handleImageApiChange() {
        const imageApi = this.imageApiSelect.value;
        const imgToImgRow = document.querySelector('.settings-row:has(#imgToImgCheck)');

        if (imageApi === 'pollinations') {
            this.pollinationsSettings.style.display = 'block';
            if (imgToImgRow) {
                imgToImgRow.style.display = 'none';
            }
        } else {
            this.pollinationsSettings.style.display = 'none';
            if (imgToImgRow) {
                imgToImgRow.style.display = 'flex';
            }
        }
    }

    handleLanguageChange() {
        this.settings.language = this.languageSelector.value;
        localStorage.setItem('comicGeneratorSettings', JSON.stringify(this.settings));
        this.updateInterfaceLanguage();
    }

    updateInterfaceLanguage() {
        const lang = this.settings.language || 'es';
        const t = this.translations[lang];

        // Actualizar textos de la interfaz
        document.querySelector('header h1').textContent = t.title;
        document.querySelector('header p').textContent = t.subtitle;
        this.generatorTab.textContent = t.generatorTab;
        this.settingsTab.textContent = t.settingsTab;
        this.promptInput.placeholder = t.promptPlaceholder;
        
        // Actualizar etiquetas
        document.querySelector('label[for="artStyleSelect"]').textContent = t.artStyle;
        document.querySelector('label[for="customStyleInput"]').textContent = t.customStyle;
        this.customStyleInput.placeholder = t.customStylePlaceholder;
        document.querySelector('label[for="imgToImgCheck"]').textContent = t.imgToImg;
        document.querySelector('.checkbox-label').textContent = t.imgToImgLabel;
        document.querySelector('label[for="panelCountSelect"]').textContent = t.panelCount;
        
        // Actualizar botones
        this.generateBtn.querySelector('.btn-text').textContent = t.generateBtn;
        this.clearBtn.textContent = t.clearBtn;
        this.cancelBtn.textContent = t.cancelBtn;
        this.continueBtn.querySelector('.btn-text').textContent = t.continueBtn;
        this.regenerateBtn.querySelector('.btn-text').textContent = t.regenerateBtn;
        this.publishBtn.querySelector('.btn-text').textContent = t.publishBtn;
        this.downloadComicBtn.querySelector('.btn-text').textContent = t.downloadComicBtn;
        
        // Actualizar sección de guion
        document.querySelector('.script-section h3').textContent = t.scriptTitle;
        
        // Actualizar ajustes
        document.querySelector('.settings-header h2').textContent = t.settingsTitle;
        document.querySelector('.settings-header p').textContent = t.settingsSubtitle;
        
        // Actualizar etiquetas de ajustes
        const settingsSections = document.querySelectorAll('.settings-section h3');
        settingsSections[0].textContent = t.languageLabel.replace(':', '');
        settingsSections[1].textContent = t.aspectRatioTitle || 'Relación de Aspecto de Diapositivas';
        settingsSections[2].textContent = t.textApiTitle;
        settingsSections[3].textContent = t.imageApiTitle;
        settingsSections[4].textContent = t.apiKeyTitle;
        
        document.querySelector('label[for="languageSelector"]').textContent = t.languageLabel;
        
        const aspectRatioLabel = document.querySelector('label[for="aspectRatioSelector"]');
        if (aspectRatioLabel) {
            aspectRatioLabel.textContent = t.aspectRatioLabel || 'Relación de Aspecto:';
        }
        
        const aspectRatioHints = document.querySelectorAll('.settings-hint');
        if (aspectRatioHints.length > 0) {
            aspectRatioHints[0].textContent = t.aspectRatioHint || 'Define las dimensiones de las diapositivas en la presentación descargada.';
            if (aspectRatioHints.length > 1) {
                aspectRatioHints[1].textContent = t.apiKeyHint;
            }
        }
        
        document.querySelector('label[for="modelSelector"]').textContent = t.modelLabel;
        document.querySelector('label[for="imageApiSelect"]').textContent = t.imageApiLabel;
        document.querySelector('label[for="pollinationsModelSelect"]').textContent = t.pollinationsModelLabel;
        document.querySelector('label[for="apiKeyInput"]').textContent = t.apiKeyLabel;
        this.apiKeyInput.placeholder = t.apiKeyPlaceholder;
        this.getApiKeyBtn.textContent = t.getApiKeyBtn;
        this.saveSettingsBtn.textContent = t.saveSettingsBtn;
        this.resetSettingsBtn.textContent = t.resetSettingsBtn;
        
        const cleanStorageBtn = document.getElementById('cleanStorageBtn');
        if (cleanStorageBtn) {
            cleanStorageBtn.textContent = t.cleanStorageBtn || '🗑️ Limpiar Almacenamiento';
        }
        
        // Actualizar mensaje de progreso si está en estado inicial
        if (this.progressText.textContent.includes('Listo') || this.progressText.textContent.includes('Ready') || this.progressText.textContent.includes('Prêt')) {
            this.progressText.textContent = t.readyToGenerate;
        }
    }

    getTranslation(key) {
        const lang = this.settings.language || 'es';
        return this.translations[lang][key] || this.translations['es'][key];
    }

    saveSettings() {
        console.log('saveSettings called'); // Debug
        
        // Validar que todos los elementos existan
        if (!this.modelSelector) {
            console.error('modelSelector is null');
            return;
        }
        if (!this.imageApiSelect) {
            console.error('imageApiSelect is null');
            return;
        }
        if (!this.languageSelector) {
            console.error('languageSelector is null');
            return;
        }
        if (!this.aspectRatioSelector) {
            console.error('aspectRatioSelector is null');
            return;
        }
        
        this.settings.textModel = this.modelSelector.value;
        this.settings.imageApi = this.imageApiSelect.value;
        this.settings.pollinationsModel = document.getElementById('pollinationsModelSelect').value;
        this.settings.apiKey = this.apiKeyInput.value;
        this.settings.language = this.languageSelector.value;
        this.settings.aspectRatio = this.aspectRatioSelector.value;
        this.settings.artStyle = this.artStyleSelect.value;
        this.settings.customStyle = this.customStyleInput.value;

        console.log('Settings to save:', this.settings); // Debug

        try {
            localStorage.setItem('comicGeneratorSettings', JSON.stringify(this.settings));
            localStorage.setItem('pollinations_api_key', this.settings.apiKey);
            console.log('Settings saved successfully to localStorage'); // Debug
            
            // Actualizar el aspect ratio de los paneles inmediatamente
            this.updatePanelAspectRatio();
            
            alert(this.getTranslation('alertSettingsSaved'));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            
            // Si el error es por falta de espacio, intentar limpiar y reintentar
            if (error.name === 'QuotaExceededError') {
                if (confirm('El almacenamiento está lleno. ¿Deseas limpiar datos antiguos y reintentar?')) {
                    this.cleanupLocalStorage();
                    try {
                        localStorage.setItem('comicGeneratorSettings', JSON.stringify(this.settings));
                        localStorage.setItem('pollinations_api_key', this.settings.apiKey);
                        alert(this.getTranslation('alertSettingsSaved'));
                    } catch (retryError) {
                        alert('Error: No se pudo guardar incluso después de limpiar. Por favor, limpia manualmente el almacenamiento del navegador.');
                    }
                }
            } else {
                alert('Error al guardar los ajustes: ' + error.message);
            }
        }
    }

    cleanupLocalStorage() {
        console.log('Cleaning up localStorage...');
        
        // Obtener el tamaño actual de localStorage
        let totalSize = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                totalSize += localStorage[key].length + key.length;
            }
        }
        console.log('Current localStorage size:', totalSize, 'characters');
        
        // Lista de claves que queremos mantener
        const keysToKeep = ['comicGeneratorSettings', 'pollinations_api_key'];
        
        // Eliminar todas las claves excepto las importantes
        const keysToRemove = [];
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key) && !keysToKeep.includes(key)) {
                keysToRemove.push(key);
            }
        }
        
        console.log('Removing', keysToRemove.length, 'items from localStorage');
        keysToRemove.forEach(key => {
            console.log('Removing:', key);
            localStorage.removeItem(key);
        });
        
        // Calcular el nuevo tamaño
        let newSize = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                newSize += localStorage[key].length + key.length;
            }
        }
        console.log('New localStorage size:', newSize, 'characters');
        console.log('Freed up:', totalSize - newSize, 'characters');
    }

    async loadPollinationsModels() {
        await Promise.all([
            this.loadTextModels(),
            this.loadImageModels()
        ]);
        // Re-aplicar los valores guardados después de poblar los selects
        const saved = localStorage.getItem('comicGeneratorSettings');
        if (saved) {
            const s = JSON.parse(saved);
            if (s.textModel) this.modelSelector.value = s.textModel;
            if (s.pollinationsModel) document.getElementById('pollinationsModelSelect').value = s.pollinationsModel;
        }
    }

    async loadTextModels() {
        const select = this.modelSelector;
        try {
            const res = await fetch('https://gen.pollinations.ai/text/models');
            if (!res.ok) return;
            const data = await res.json();

            // La API puede devolver array u objeto con propiedad models/data
            let models = Array.isArray(data) ? data : (data.models || data.data || Object.values(data));
            if (!models || models.length === 0) return;

            const free = models.filter(m => !m.paid_only);
            const paid = models.filter(m => m.paid_only);
            const sorted = [...free, ...paid];

            const currentVal = select.value;
            select.innerHTML = '';
            sorted.forEach(m => {
                const opt = document.createElement('option');
                const modelName = m.name || m.id || m;
                opt.value = modelName;
                opt.textContent = modelName + (m.paid_only ? ' (pago)' : '');
                select.appendChild(opt);
            });
            // Restaurar selección previa si existe
            if ([...select.options].some(o => o.value === currentVal)) {
                select.value = currentVal;
            }
        } catch (e) {
            console.warn('No se pudieron cargar los modelos de texto:', e);
        }
    }

    async loadImageModels() {
        const select = document.getElementById('pollinationsModelSelect');
        try {
            const res = await fetch('https://enter.pollinations.ai/api/generate/image/models');
            if (!res.ok) return;
            const data = await res.json();

            // La API puede devolver array u objeto con propiedad models/data
            let models = Array.isArray(data) ? data : (data.models || data.data || Object.values(data));
            if (!models || models.length === 0) return;

            const free = models.filter(m => !m.paid_only);
            const paid = models.filter(m => m.paid_only);
            const sorted = [...free, ...paid];

            const currentVal = select.value;
            select.innerHTML = '';
            sorted.forEach(m => {
                const opt = document.createElement('option');
                const modelName = m.name || m.id || m;
                opt.value = modelName;
                opt.textContent = modelName + (m.paid_only ? ' (pago)' : '');
                select.appendChild(opt);
            });
            // Restaurar selección previa si existe
            if ([...select.options].some(o => o.value === currentVal)) {
                select.value = currentVal;
            }
        } catch (e) {
            console.warn('No se pudieron cargar los modelos de imagen:', e);
        }
    }

    loadSettings() {
        const saved = localStorage.getItem('comicGeneratorSettings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
        }

        this.modelSelector.value = this.settings.textModel;
        this.imageApiSelect.value = this.settings.imageApi;
        document.getElementById('pollinationsModelSelect').value = this.settings.pollinationsModel;
        if (this.apiKeyInput) this.apiKeyInput.value = this.settings.apiKey || '';
        if (this.languageSelector) this.languageSelector.value = this.settings.language || 'es';
        if (this.aspectRatioSelector) this.aspectRatioSelector.value = this.settings.aspectRatio || '16:9';
        if (this.artStyleSelect) this.artStyleSelect.value = this.settings.artStyle || 'none';
        if (this.customStyleInput) this.customStyleInput.value = this.settings.customStyle || '';

        // Actualizar la visibilidad del campo de estilo personalizado
        this.handleArtStyleChange();

        this.handleImageApiChange();
    }

    resetSettings() {
        if (confirm(this.getTranslation('alertResetSettings') || '¿Estás seguro de que quieres restablecer todos los ajustes a los valores predeterminados?')) {
            localStorage.removeItem('comicGeneratorSettings');
            this.settings = {
                textModel: 'openai',
                imageApi: 'pollinations',
                pollinationsModel: 'flux',
                apiKey: '',
                language: 'es',
                aspectRatio: '16:9',
                artStyle: 'none',
                customStyle: ''
            };
            this.loadSettings();
            this.updateInterfaceLanguage();
            alert(this.getTranslation('alertSettingsReset') || '¡Ajustes restablecidos a los valores predeterminados!');
        }
    }

    extractJsonContent(content) {
        const jsonBlockPattern = /```(?:json)?\s*([\s\S]*?)\s*```/;
        const match = content.match(jsonBlockPattern);

        if (match) {
            return match[1].trim();
        }

        return content.trim();
    }

    toggleTheme() {
        const body = document.body;
        const isDarkMode = body.classList.contains('dark-mode');

        if (isDarkMode) {
            body.classList.remove('dark-mode');
            document.getElementById('themeToggle').textContent = '🌙';
            localStorage.setItem('comicGeneratorTheme', 'light');
        } else {
            body.classList.add('dark-mode');
            document.getElementById('themeToggle').textContent = '☀️';
            localStorage.setItem('comicGeneratorTheme', 'dark');
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('comicGeneratorTheme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            document.getElementById('themeToggle').textContent = '☀️';
        } else {
            document.getElementById('themeToggle').textContent = '🌙';
        }
    }

    editSpeechBubble(speechBubble, panelIndex) {
        if (speechBubble.querySelector('input')) {
            return;
        }

        const currentText = speechBubble.textContent || '';
        speechBubble.innerHTML = '';

        const inputContainer = document.createElement('div');
        inputContainer.className = 'speech-edit-container';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'speech-edit-input';
        input.placeholder = 'Introduce el diálogo...';

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'speech-edit-buttons';

        const saveBtn = document.createElement('button');
        saveBtn.textContent = '✓';
        saveBtn.className = 'speech-save-btn';

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = '✕';
        cancelBtn.className = 'speech-cancel-btn';

        const saveSpeech = async () => {
            const newText = input.value.trim();
            speechBubble.innerHTML = '';

            if (newText || currentText !== newText) {
                if (this.currentScript && this.currentScript.panels[panelIndex]) {
                    this.currentScript.panels[panelIndex].dialogue = newText;
                }

                if (this.currentScript) {
                    this.displayScript(this.currentScript);
                }

                // Regenerar la imagen del panel con el nuevo diálogo
                if (this.currentScript && this.currentScript.panels[panelIndex]) {
                    speechBubble.textContent = 'Regenerando imagen...';
                    speechBubble.classList.add('visible');
                    try {
                        await this.generatePanel(panelIndex, this.currentScript.panels[panelIndex], this.currentScript);
                    } catch (error) {
                        console.error('Error regenerating panel with new dialogue:', error);
                        alert('Error al regenerar el panel con el nuevo diálogo');
                    }
                }
            }
            
            speechBubble.classList.remove('visible');
        };

        const cancelEdit = () => {
            speechBubble.innerHTML = '';
            speechBubble.classList.remove('visible');
        };

        saveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            saveSpeech();
        });

        cancelBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            cancelEdit();
        });

        input.addEventListener('keydown', (e) => {
            e.stopPropagation();
            if (e.key === 'Enter') {
                saveSpeech();
            } else if (e.key === 'Escape') {
                cancelEdit();
            }
        });

        buttonContainer.appendChild(saveBtn);
        buttonContainer.appendChild(cancelBtn);
        inputContainer.appendChild(input);
        inputContainer.appendChild(buttonContainer);
        speechBubble.appendChild(inputContainer);
        speechBubble.classList.add('visible');

        input.focus();
        input.select();
    }

    ensurePanelCount(targetCount) {
        while (this.panels.length > targetCount) {
            const panel = this.panels.pop();
            panel.remove();
        }

        while (this.panels.length < targetCount) {
            this.createNewPanel(this.panels.length);
        }

        this.panelCount = this.panels.length;
    }

    clearExistingPanels() {
        // Get the target panel count
        const selectedPanelCount = parseInt(this.panelCountSelect.value);

        // Remove any extra panels beyond the selected count
        while (this.panels.length > selectedPanelCount) {
            const panel = this.panels.pop();
            panel.remove();
        }

        // Add panels if we don't have enough
        while (this.panels.length < selectedPanelCount) {
            this.createNewPanel(this.panels.length);
        }

        // Reset all panels
        this.panels.forEach((panel, index) => {
            const img = panel.querySelector('img');
            if (img) img.remove();

            const placeholder = panel.querySelector('.panel-placeholder');
            placeholder.innerHTML = `Panel ${index + 1}`;
            placeholder.style.display = 'block';

            const speechBubble = panel.querySelector('.speech-bubble');
            speechBubble.classList.remove('visible');
            speechBubble.textContent = '';

            // Mostrar paneles ocultos
            panel.style.display = 'block';
            panel.classList.remove('panel-error');
        });
    }

    createNewPanel(panelIndex) {
        const panel = document.createElement('div');
        panel.className = 'panel';
        panel.id = `panel${panelIndex + 1}`;

        panel.innerHTML = `
    <div class="panel-number">${panelIndex + 1}</div>
    <div class="panel-placeholder">Panel ${panelIndex + 1}</div>
    <div class="speech-bubble"></div>
`;

        this.comicGrid.appendChild(panel);
        this.panels.push(panel);

        // Aplicar aspect ratio al nuevo panel inmediatamente
        const aspectRatioMap = { '16:9': '16 / 9', '1:1': '1 / 1', '9:16': '9 / 16' };
        panel.style.aspectRatio = aspectRatioMap[this.settings.aspectRatio] || '16 / 9';

        // Setup panel info for new panel
        this.setupPanelInfo(panel, panelIndex);
    }

    validateApiKey() {
        if (!this.settings.apiKey || !this.settings.apiKey.trim()) {
            alert('Por favor, introduce tu Clave API en la pestaña de Ajustes antes de generar.');
            this.switchToSettings();
            if (this.apiKeyInput) {
                this.apiKeyInput.focus();
                this.apiKeyInput.style.borderColor = '#ff6b6b';
                this.apiKeyInput.style.boxShadow = '0 0 10px rgba(255, 107, 107, 0.3)';
            }
            return false;
        }
        return true;
    }
}

// Initialize the comic generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.comicGenerator = new ComicGenerator();
});