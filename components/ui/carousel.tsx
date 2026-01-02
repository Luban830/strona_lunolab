"use client";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

type PropType = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
  autoplay?: boolean;
};

const Carousel: React.FC<PropType> = (props) => {
  const { slides, options, autoplay = false } = props;
  const progressNode = useRef<HTMLDivElement>(null);

  const plugins = autoplay ? [Autoplay({ playOnInit: true, delay: 3000 })] : [];

  const defaultOptions: EmblaOptionsType = {
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps',
    ...options,
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(defaultOptions, plugins);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  const { showAutoplayProgress } = useAutoplayProgress(
    emblaApi,
    progressNode as React.RefObject<HTMLElement>
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="relative">
      {/* Main carousel container */}
      <div className="px-4 sm:px-8 md:px-16">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((slideContent, index) => (
              <div 
                className="flex-[0_0_90%] sm:flex-[0_0_75%] md:flex-[0_0_60%] lg:flex-[0_0_55%] min-w-0 px-2 sm:px-3 md:px-4" 
                key={index}
              >
                <div
                  style={{ 
                    opacity: index === selectedIndex ? 1 : 0.7,
                    transform: index === selectedIndex ? 'scale(1)' : 'scale(0.95)',
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                    pointerEvents: index === selectedIndex ? 'auto' : 'none',
                  }}
                >
                  {slideContent}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Arrow navigation - hidden on very small screens */}
      <button
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
        className="hidden sm:flex absolute left-0 sm:left-1 md:left-2 top-1/2 -translate-y-1/2 bg-[#1e1f1e] border-2 border-[#27F579]/50 text-[#27F579] w-10 h-10 md:w-12 md:h-12 rounded-full items-center justify-center hover:border-[#27F579] hover:bg-[#27F579]/10 hover:shadow-[0_0_15px_rgba(39,245,121,0.4)] transition-all disabled:opacity-30 disabled:cursor-not-allowed z-10"
        aria-label="Poprzedni"
      >
        <ChevronLeft size={20} className="md:w-6 md:h-6" />
      </button>
      <button
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
        className="hidden sm:flex absolute right-0 sm:right-1 md:right-2 top-1/2 -translate-y-1/2 bg-[#1e1f1e] border-2 border-[#27F579]/50 text-[#27F579] w-10 h-10 md:w-12 md:h-12 rounded-full items-center justify-center hover:border-[#27F579] hover:bg-[#27F579]/10 hover:shadow-[0_0_15px_rgba(39,245,121,0.4)] transition-all disabled:opacity-30 disabled:cursor-not-allowed z-10"
        aria-label="Następny"
      >
        <ChevronRight size={20} className="md:w-6 md:h-6" />
      </button>

      {/* Dots and controls - only show if autoplay is enabled */}
      {autoplay && (
        <div className="flex mx-auto max-w-80 justify-between items-center gap-3 mt-7">
          <div className="flex justify-center gap-2">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() =>
                  onAutoplayButtonClick(() => onDotButtonClick(index))
                }
                className={`w-3 h-3 rounded-full border-2 border-border transition-colors duration-200 ${
                  index === selectedIndex
                    ? "bg-foreground"
                    : "bg-transparent hover:bg-muted"
                }`}
              />
            ))}
          </div>

          <div
            className={`rounded-[1.8rem] border-2 border-border bg-background relative h-2 justify-self-center self-center w-40 max-w-[90%] overflow-hidden transition-opacity duration-300 ease-in-out ${
              showAutoplayProgress ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="bg-foreground absolute w-full top-0 bottom-0 -left-full animate-[autoplay-progress_linear_1] [animation-play-state:running]"
              ref={progressNode}
              style={{
                animationPlayState: showAutoplayProgress ? "running" : "paused",
              }}
            />
          </div>

          <Button size={'icon'} variant={"secondary"} onClick={toggleAutoplay} type="button">
            {autoplayIsPlaying ? (
              <Pause fill="currentColor" />
            ) : (
              <Play fill="currentColor" />
            )}
          </Button>
        </div>
      )}

      {/* Simple dots indicator when not autoplay */}
      {!autoplay && (
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "bg-[#27F579] w-6 sm:w-8"
                  : "bg-white/30 hover:bg-white/50 w-2"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

export const DotButton: React.FC<PropTypeButton> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};

type UseAutoplayProgressType = {
  showAutoplayProgress: boolean;
};

export const useAutoplayProgress = <ProgressElement extends HTMLElement>(
  emblaApi: EmblaCarouselType | undefined,
  progressNode: React.RefObject<ProgressElement>
): UseAutoplayProgressType => {
  const [showAutoplayProgress, setShowAutoplayProgress] = useState(false);
  const animationName = useRef("");
  const timeoutId = useRef(0);
  const rafId = useRef(0);

  const startProgress = useCallback((timeUntilNext: number | null) => {
    const node = progressNode.current;

    if (!node) return;
    if (timeUntilNext === null) return;

    if (!animationName.current) {
      const style = window.getComputedStyle(node);
      animationName.current = style.animationName;
    }

    node.style.animationName = "none";
    node.style.transform = "translate3d(0,0,0)";

    rafId.current = window.requestAnimationFrame(() => {
      timeoutId.current = window.setTimeout(() => {
        node.style.animationName = animationName.current;
        node.style.animationDuration = `${timeUntilNext}ms`;
      }, 0);
    });

    setShowAutoplayProgress(true);
  }, [progressNode]);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    emblaApi
      .on("autoplay:timerset", () => startProgress(autoplay.timeUntilNext()))
      .on("autoplay:timerstopped", () => setShowAutoplayProgress(false));
  }, [emblaApi, startProgress]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafId.current);
      clearTimeout(timeoutId.current);
    };
  }, []);

  return {
    showAutoplayProgress,
  };
};

type UseAutoplayType = {
  autoplayIsPlaying: boolean;
  toggleAutoplay: () => void;
  onAutoplayButtonClick: (callback: () => void) => void;
};

export const useAutoplay = (
  emblaApi: EmblaCarouselType | undefined
): UseAutoplayType => {
  const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false);

  const onAutoplayButtonClick = useCallback(
    (callback: () => void) => {
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (!autoplay) return;

      const resetOrStop =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset
          : autoplay.stop;

      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
    playOrStop();
  }, [emblaApi]);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    setAutoplayIsPlaying(autoplay.isPlaying());
    emblaApi
      .on("autoplay:play", () => setAutoplayIsPlaying(true))
      .on("autoplay:stop", () => setAutoplayIsPlaying(false))
      .on("reInit", () => setAutoplayIsPlaying(autoplay.isPlaying()));
  }, [emblaApi]);

  return {
    autoplayIsPlaying,
    toggleAutoplay,
    onAutoplayButtonClick,
  };
};

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropTypeButton = React.PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

export const PrevButton: React.FC<PropTypeButton> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-border bg-transparent text-foreground disabled:text-muted-foreground"
      type="button"
      {...restProps}
    >
      <ChevronLeft />
      {children}
    </button>
  );
};

export const NextButton: React.FC<PropTypeButton> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-border bg-transparent text-foreground disabled:text-muted-foreground"
      type="button"
      {...restProps}
    >
      <ChevronRight />
      {children}
    </button>
  );
};

export { Carousel };
