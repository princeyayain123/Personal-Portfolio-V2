import { Slab } from 'react-loading-indicators';

function LoadingAnimation() {
  return (
    <>
      <Slab color={['#ffffff', '#000000']} size="large" text="Please Wait" textColor="" />
    </>
  );
}

export default LoadingAnimation;
