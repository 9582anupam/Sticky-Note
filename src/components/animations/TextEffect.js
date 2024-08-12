"use client";
import { motion } from "framer-motion";
import React from "react";

const defaultContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, // Adjust for smoother staggering
            delayChildren: 0.3, // Start delay for children
            ease: "linear"
        },
    },
};

const defaultItemVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5, // Adjust duration for smoother animation
            ease: "linear", // Smoother easing
            delay: 0.3, // Start delay for individual items
        },
    },
};

const presetVariants = {
    blur: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, filter: "blur(12px)" },
            visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } },
        },
    },
    shake: {
        container: defaultContainerVariants,
        item: {
            hidden: { x: 0 },
            visible: { x: [-5, 5, -5, 5, 0], transition: { duration: 0.6, ease: "easeOut" } },
        },
    },
    scale: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, scale: 0.8 }, // Slightly smaller scale for smoother scaling
            visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
        },
    },
    fade: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
        },
    },
    slide: {
        container: defaultContainerVariants,
        item: {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        },
    },
};

const AnimationComponent = React.memo(({ word, variants, per }) => {
    if (per === "word") {
        return (
            <motion.span
                aria-hidden="true"
                variants={variants}
                className="inline-block whitespace-pre">
                {word}
            </motion.span>
        );
    }

    return (
        <span className="inline-block whitespace-pre">
            {word.split("").map((char, index) => (
                <motion.span
                    key={`char-${index}-${char}`}
                    aria-hidden="true"
                    variants={variants}
                    className="inline-block whitespace-pre">
                    {char}
                </motion.span>
            ))}
        </span>
    );
});

AnimationComponent.displayName = "AnimationComponent";

export function TextEffect({
    children,
    per = "word",
    as = "p",
    variants,
    className,
    preset,
}) {
    const words = children.split(/(\s+)/); // Splitting by whitespace
    const MotionTag = motion[as];
    const selectedVariants = preset
        ? presetVariants[preset]
        : { container: defaultContainerVariants, item: defaultItemVariants };
    const containerVariants = variants?.container || selectedVariants.container;
    const itemVariants = variants?.item || selectedVariants.item;

    return (
        <MotionTag
            initial="hidden"
            animate="visible"
            aria-label={children}
            variants={containerVariants}
            className={className}>
            {words.map((word, index) => (
                <AnimationComponent
                    key={`word-${index}`}
                    word={word}
                    variants={itemVariants}
                    per={per}
                />
            ))}
        </MotionTag>
    );
}
