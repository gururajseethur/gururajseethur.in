import { render, screen, act } from '@testing-library/react';
import useIntersectionObserver from './useIntersectionObserver';

// Test component to use the hook
function TestComponent({ options }) {
  const { ref, isVisible } = useIntersectionObserver(options);

  return (
    <div ref={ref} data-testid="test-element">
      {isVisible ? 'Visible' : 'Hidden'}
    </div>
  );
}

describe('useIntersectionObserver', () => {
  let observeMock;
  let unobserveMock;
  let disconnectMock;
  let intersectionCallback;

  beforeEach(() => {
    observeMock = vi.fn();
    unobserveMock = vi.fn();
    disconnectMock = vi.fn();

    // Save the callback passed to IntersectionObserver so we can call it manually
    class MockIntersectionObserver {
      constructor(cb) {
        intersectionCallback = cb;
        this.observe = observeMock;
        this.unobserve = unobserveMock;
        this.disconnect = disconnectMock;
      }
    }
    window.IntersectionObserver = MockIntersectionObserver;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be initially hidden', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('test-element')).toHaveTextContent('Hidden');
    expect(observeMock).toHaveBeenCalledTimes(1);
  });

  it('should become visible when intersecting', () => {
    render(<TestComponent />);

    act(() => {
      intersectionCallback([{ isIntersecting: true, target: screen.getByTestId('test-element') }]);
    });

    expect(screen.getByTestId('test-element')).toHaveTextContent('Visible');
  });

  it('should not update if not intersecting', () => {
    render(<TestComponent />);

    act(() => {
      intersectionCallback([{ isIntersecting: false, target: screen.getByTestId('test-element') }]);
    });

    expect(screen.getByTestId('test-element')).toHaveTextContent('Hidden');
  });

  it('should unobserve after first trigger if triggerOnce is true (default)', () => {
    render(<TestComponent />);

    const target = screen.getByTestId('test-element');

    act(() => {
      intersectionCallback([{ isIntersecting: true, target }]);
    });

    expect(screen.getByTestId('test-element')).toHaveTextContent('Visible');
    expect(unobserveMock).toHaveBeenCalledWith(target);
    expect(unobserveMock).toHaveBeenCalledTimes(1);
  });

  it('should not unobserve after trigger if triggerOnce is false', () => {
    render(<TestComponent options={{ triggerOnce: false }} />);

    const target = screen.getByTestId('test-element');

    act(() => {
      intersectionCallback([{ isIntersecting: true, target }]);
    });

    expect(screen.getByTestId('test-element')).toHaveTextContent('Visible');
    expect(unobserveMock).not.toHaveBeenCalled();
  });

  it('should cleanup observer on unmount', () => {
    const { unmount } = render(<TestComponent />);
    unmount();
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
