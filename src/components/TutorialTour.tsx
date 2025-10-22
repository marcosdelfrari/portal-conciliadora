"use client";

import {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import { X } from "lucide-react";

interface TutorialStep {
  title: string;
  description: string;
  target: string;
}

const steps: TutorialStep[] = [
  {
    title: "Botão Flutuante",
    description: "Clique no botão verde para abrir o menu",
    target: ".float-button-main",
  },
  {
    title: "Menu Secundário",
    description: "Clique no botão de configurações",
    target: ".float-button-tools",
  },
  {
    title: "Alternar Menus",
    description: "Clique novamente para voltar ao menu anterior",
    target: ".float-button-tools",
  },
  {
    title: "Fechar Menu",
    description: "Clique no botão principal ou fora do menu",
    target: ".float-button-main",
  },
];

export interface TutorialTourRef {
  restart: () => void;
}

export const TutorialTour = forwardRef<TutorialTourRef>((props, ref) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);

  // Log quando currentStep muda
  useEffect(() => {
    console.log("📍 currentStep mudou para:", currentStep);
  }, [currentStep]);

  useImperativeHandle(ref, () => ({
    restart: () => {
      setIsActive(true);
      setCurrentStep(0);
      setShowTutorial(false);
    },
  }));

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("dashboard-tutorial-seen");
    if (!hasSeenTutorial) {
      const timer = setTimeout(() => {
        setShowTutorial(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const startTutorial = useCallback(() => {
    setIsActive(true);
    setCurrentStep(0);
    setShowTutorial(false);
  }, []);

  const skipTutorial = useCallback(() => {
    setShowTutorial(false);
    setIsActive(false);
    localStorage.setItem("dashboard-tutorial-seen", "true");
  }, []);

  const completeTutorial = useCallback(() => {
    setIsActive(false);
    setCurrentStep(0);
    localStorage.setItem("dashboard-tutorial-seen", "true");
  }, []);

  // Detecta cliques nos botões para avançar automaticamente
  useEffect(() => {
    if (!isActive) return;

    const handleButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      console.log("CLIQUE DETECTADO:", {
        currentStep,
        tag: target.tagName,
        isMainButton: !!target.closest(".float-button-main"),
        isToolsButton: !!target.closest(".float-button-tools"),
      });

      // Verifica se clicou no tooltip - não faz nada
      if (target.closest(".tutorial-tooltip")) {
        console.log("Ignorando clique no tooltip");
        return;
      }

      // Passo 1: Detecta clique no botão principal
      if (currentStep === 0 && target.closest(".float-button-main")) {
        console.log("✓ Detectado clique no botão principal - avançando");
        setCurrentStep(1);
        return;
      }

      // Passo 2: Detecta clique no botão de ferramentas
      if (currentStep === 1 && target.closest(".float-button-tools")) {
        setTimeout(() => setCurrentStep(2), 300);
        return;
      }

      // Passo 3: Detecta clique novamente no botão de ferramentas
      if (currentStep === 2 && target.closest(".float-button-tools")) {
        setTimeout(() => setCurrentStep(3), 300);
        return;
      }

      // Passo 4: Detecta clique para fechar o menu
      if (currentStep === 3) {
        const isMainButton = target.closest(".float-button-main");
        const isFloatOverlay = target.classList.contains(
          "float-button-overlay"
        );

        if (isMainButton || isFloatOverlay) {
          setTimeout(() => completeTutorial(), 300);
          return;
        }
      }
    };

    // Usa capture: true para capturar o evento ANTES do FloatButton
    document.addEventListener("click", handleButtonClick, true);
    return () => document.removeEventListener("click", handleButtonClick, true);
  }, [isActive, currentStep, completeTutorial]);

  const getHighlightStyle = () => {
    const step = steps[currentStep];
    const target = document.querySelector(step.target);
    if (!target) return {};
    const rect = target.getBoundingClientRect();
    return {
      top: `${rect.top - 4}px`,
      left: `${rect.left - 4}px`,
      width: `${rect.width + 8}px`,
      height: `${rect.height + 8}px`,
    };
  };

  const getTooltipPosition = () => {
    const step = steps[currentStep];
    const target = document.querySelector(step.target);
    if (!target) return { position: {}, arrowPosition: "bottom-right" };

    const rect = target.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      return {
        position: {
          top: "75%",
          left: "50%",
          transform: "translateX(-50%)",
        },
        arrowPosition: "bottom-right",
      };
    } else {
      const spaceAbove = rect.top;

      if (spaceAbove > 150) {
        return {
          position: {
            bottom: `${window.innerHeight - rect.top + 10}px`,
            right: "0%",
            transform: "translateX(-50%)",
          },
          arrowPosition: "bottom-right",
        };
      } else {
        return {
          position: {
            top: `${rect.top + rect.height / 2}px`,
            right: `${window.innerWidth - rect.left + 20}px`,
            transform: "translateY(-50%)",
          },
          arrowPosition: "bottom-right",
        };
      }
    }
  };

  if (!showTutorial && !isActive) return null;

  return (
    <>
      {/* Tutorial ativo */}
      {isActive && (
        <>
          {/* Efeito spotlight com área clara no centro */}
          <div
            className="fixed z-[50] rounded-full transition-all duration-300 pointer-events-none"
            style={{
              ...getHighlightStyle(),
              boxShadow:
                "0 0 0 3px rgba(200, 211, 0, 0.8), 0 0 0 9999px rgba(0, 0, 0, 0.6)",
            }}
          />

          {/* Tooltip */}
          <div
            className="fixed z-[200] transition-all duration-300"
            style={getTooltipPosition().position}
          >
            <div className="tutorial-tooltip relative bg-white dark:bg-[#1a1a1a] rounded-lg p-4 shadow-xl mx-4 w-[220px] border border-white dark:border-white">
              {/* Seta do balão - sempre no canto inferior direito */}

              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {currentStep + 1}/{steps.length}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-[#c8d300]">
                    {steps[currentStep].title}
                  </h3>
                </div>
                <button
                  onClick={skipTutorial}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-2 flex-shrink-0"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {steps[currentStep].description}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
});

TutorialTour.displayName = "TutorialTour";
