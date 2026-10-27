import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SignalEngineProvider, useSignalEngine } from '../SignalEngineContext';

function TestConsumer() {
  const { sceneState, coreIntensity } = useSignalEngine();
  return (
    <div>
      <span data-testid="scene-state">{sceneState}</span>
      <span data-testid="core-intensity">{coreIntensity}</span>
    </div>
  );
}

describe('SignalEngineContext', () => {
  it('initializes to arrival state on root route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SignalEngineProvider>
          <TestConsumer />
        </SignalEngineProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('scene-state').textContent).toBe('arrival');
    expect(screen.getByTestId('core-intensity').textContent).toBe('1');
  });

  it('switches state to security on /security route', () => {
    render(
      <MemoryRouter initialEntries={['/security']}>
        <SignalEngineProvider>
          <TestConsumer />
        </SignalEngineProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('scene-state').textContent).toBe('security');
  });

  it('switches state to creative on /creative route', () => {
    render(
      <MemoryRouter initialEntries={['/creative']}>
        <SignalEngineProvider>
          <TestConsumer />
        </SignalEngineProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('scene-state').textContent).toBe('creative');
  });

  it('switches state to ai-lab on /projects route', () => {
    render(
      <MemoryRouter initialEntries={['/projects']}>
        <SignalEngineProvider>
          <TestConsumer />
        </SignalEngineProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('scene-state').textContent).toBe('ai-lab');
  });

  it('switches state to contact on /contact route', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <SignalEngineProvider>
          <TestConsumer />
        </SignalEngineProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('scene-state').textContent).toBe('contact');
  });
});
