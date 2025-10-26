'use client';
import React from 'react';
import {
  tva,
  withStyleContext,
  useStyleContext,
  type VariantProps,
} from '@gluestack-ui/utils/nativewind-utils';
import { Pressable, Text, View } from 'react-native';

const SCOPE = 'CHIP';

const Root = withStyleContext(Pressable, SCOPE);

const chipStyle = tva({
  base: 'group/chip rounded-full flex-row items-center justify-center data-[focus-visible=true]:web:outline-none data-[focus-visible=true]:web:ring-2 data-[disabled=true]:opacity-40',
  variants: {
    variant: {
      primary:
        'bg-primary-100 border border-primary-200 data-[hover=true]:bg-primary-200 data-[active=true]:bg-primary-300',
      secondary:
        'bg-amber-50 border border-amber-200 data-[hover=true]:bg-amber-100 data-[active=true]:bg-amber-200',
      success:
        'bg-success-100 border border-success-200 data-[hover=true]:bg-success-200 data-[active=true]:bg-success-300',
      error:
        'bg-error-100 border border-error-200 data-[hover=true]:bg-error-200 data-[active=true]:bg-error-300',
      outline:
        'bg-transparent border border-background-300 data-[hover=true]:bg-background-50 data-[active=true]:bg-background-100',
      solid:
        'bg-background-100 border border-background-200 data-[hover=true]:bg-background-200 data-[active=true]:bg-background-300',
    },
    size: {
      xs: 'px-2 py-1 gap-1',
      sm: 'px-2.5 py-1.5 gap-1',
      md: 'px-3 py-1.5 gap-1.5',
      lg: 'px-4 py-2 gap-2',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
});

const chipLabelStyle = tva({
  base: 'font-medium web:select-none',
  parentVariants: {
    variant: {
      primary: 'text-primary-700',
      secondary: 'text-amber-700',
      success: 'text-success-700',
      error: 'text-error-700',
      outline: 'text-typography-700',
      solid: 'text-typography-700',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
});

const chipContentStyle = tva({
  base: 'flex-row items-center justify-center',
});

type IChipProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof chipStyle> & {
    className?: string;
    onPress?: () => void;
  };

const Chip = React.forwardRef<React.ElementRef<typeof Root>, IChipProps>(
  ({ className, variant = 'solid', size = 'md', children, ...props }, ref) => {
    return (
      <Root
        ref={ref}
        {...props}
        className={chipStyle({ variant, size, class: className })}
        context={{ variant, size }}>
        {children}
      </Root>
    );
  }
);

type IChipLabelContentProps = React.ComponentPropsWithoutRef<typeof Text> &
  VariantProps<typeof chipLabelStyle> & {
    className?: string;
  };

const ChipLabelContent = React.forwardRef<React.ElementRef<typeof Text>, IChipLabelContentProps>(
  ({ className, variant, size, ...props }, ref) => {
    const { variant: parentVariant, size: parentSize } = useStyleContext(SCOPE);

    return (
      <Text
        ref={ref}
        {...props}
        className={chipLabelStyle({
          parentVariants: {
            variant: parentVariant,
            size: parentSize,
          },
          variant,
          size,
          class: className,
        })}
      />
    );
  }
);

type IChipStartContentProps = React.ComponentPropsWithoutRef<typeof View> & {
  className?: string;
};

const ChipStartContent = React.forwardRef<React.ElementRef<typeof View>, IChipStartContentProps>(
  ({ className, ...props }, ref) => {
    return <View ref={ref} {...props} className={chipContentStyle({ class: className })} />;
  }
);

type IChipEndContentProps = React.ComponentPropsWithoutRef<typeof View> & {
  className?: string;
};

const ChipEndContent = React.forwardRef<React.ElementRef<typeof View>, IChipEndContentProps>(
  ({ className, ...props }, ref) => {
    return <View ref={ref} {...props} className={chipContentStyle({ class: className })} />;
  }
);

Chip.displayName = 'Chip';
ChipLabelContent.displayName = 'ChipLabelContent';
ChipStartContent.displayName = 'ChipStartContent';
ChipEndContent.displayName = 'ChipEndContent';

// Create a compound component with sub-components
const ChipWithSubComponents = Object.assign(Chip, {
  LabelContent: ChipLabelContent,
  StartContent: ChipStartContent,
  EndContent: ChipEndContent,
});

export { ChipWithSubComponents as Chip, ChipLabelContent, ChipStartContent, ChipEndContent };

export default ChipWithSubComponents;
