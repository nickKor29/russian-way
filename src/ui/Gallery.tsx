import { useState } from "react";
import styled, { css } from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import DragAndDrop from "./DragAndDrop";
import "../styles/animations.css";
const GalleryCont = styled.div<{ $isEditing: boolean }>`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  overflow: hidden;

  ${(props) =>
    props.$isEditing &&
    css`
      row-gap: 20rem;
    `}

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-rows: 0.5fr 1fr;
    gap: 2rem;
  }
`;

const MainImageCont = styled.div<{ $isEditing: boolean }>`
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-sm);
  grid-column: 1 / -1;
  grid-row: 1 / 2;

  ${(props) =>
    props.$isEditing &&
    css`
      height: 10rem;
      align-self: center;
    `}

  @media (max-width: 768px) {
    height: auto;
  }
`;

const MainImage = styled.img`
  border-radius: var(--border-radius-sm);
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;

  @media (max-width: 570px) {
    position: static;
    height: auto;
  }
`;

const PrevImageCont = styled.div<{ $isEditing: boolean }>`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  overflow: hidden;

  ${(props) =>
    props.$isEditing &&
    css`
      grid-template-columns: repeat(2, 1fr);
    `}

  /* @media (max-width: 1000px) {
    justify-items: center;

    & > :last-child {
      grid-column: 1 / -1;
    }
  } */

  

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    justify-items: stretch;
  }
`;

const PrevImage = styled.img<{ $isActive: boolean }>`
  border-radius: var(--border-radius-sm);
  width: 24rem;
  height: 24rem;
  object-fit: cover;
  cursor: pointer;
  transition: all 0.3s;
  opacity: ${({ $isActive }) => ($isActive ? "1" : "0.6")};
  box-shadow: ${({ $isActive }) =>
    $isActive ? "0 0 10px rgba(0, 0, 0, 0.5)" : "none"};

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;
interface GalleryProps {
  images: string[];
  isEditing: boolean;
  onMainImageDrop: () => void;
  onSecondImageDrop: () => void;
  onThirdImageDrop: () => void;
}
function Gallery({
  images,
  isEditing,
  onMainImageDrop,
  onSecondImageDrop,
  onThirdImageDrop,
}: GalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  return (
    <GalleryCont $isEditing={isEditing}>
      <CSSTransition in={isEditing} timeout={300} classNames="inline-edit">
        <MainImageCont $isEditing={isEditing}>
          {isEditing ? (
            <DragAndDrop
              dropTextBefore="Главная картика"
              onDrop={onMainImageDrop}
            />
          ) : (
            <TransitionGroup component={null}>
              <CSSTransition key={currentImage} timeout={300} classNames="fade">
                <MainImage src={images[currentImage]} alt="Main Tour" />
              </CSSTransition>
            </TransitionGroup>
          )}
        </MainImageCont>
      </CSSTransition>
      <CSSTransition in={isEditing} timeout={300} classNames="inline-edit">
        <PrevImageCont $isEditing={isEditing}>
          {isEditing ? (
            <>
              <DragAndDrop
                dropTextBefore="Вторая картинка"
                onDrop={onSecondImageDrop}
              />
              <DragAndDrop
                dropTextBefore="Третья картинка"
                onDrop={onThirdImageDrop}
              />
            </>
          ) : (
            images.map((image, i) => (
              <PrevImage
                key={i}
                src={image}
                alt={`Thumbnail ${i}`}
                onClick={() => setCurrentImage(i)}
                $isActive={currentImage === i}
              />
            ))
          )}
        </PrevImageCont>
      </CSSTransition>
    </GalleryCont>
  );
}

export default Gallery;
