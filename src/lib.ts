// Create a fake asynchronous delay; Useful for testing loading states and such
export const fakeDelay = async (delay = 1000) => {
  if (import.meta.env.MODE === 'no-api') {
    await new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
};

/* This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) */