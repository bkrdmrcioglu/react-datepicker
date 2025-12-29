import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DatePicker from '@/components/DatePicker';

describe('DatePicker Component', () => {
  describe('Basic Rendering', () => {
    it('should render without crashing', () => {
      render(<DatePicker value={null} onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should display placeholder text', () => {
      const placeholder = 'Select a date';
      render(
        <DatePicker
          value={null}
          onChange={() => {}}
          placeholder={placeholder}
        />
      );
      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    });

    it('should display selected date', () => {
      const date = new Date('2024-01-15');
      render(<DatePicker value={date} onChange={() => {}} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toContain('15');
      expect(input.value).toContain('01');
      expect(input.value).toContain('2024');
    });
  });

  describe('User Interactions', () => {
    it('should open calendar when input is clicked', async () => {
      render(<DatePicker value={null} onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.click(input);
      
      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument();
      });
    });

    it('should close calendar when clicking outside', async () => {
      render(
        <div>
          <DatePicker value={null} onChange={() => {}} />
          <button>Outside</button>
        </div>
      );
      
      const input = screen.getByRole('textbox');
      fireEvent.click(input);
      
      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument();
      });
      
      const outsideButton = screen.getByText('Outside');
      fireEvent.click(outsideButton);
      
      await waitFor(() => {
        expect(screen.queryByRole('grid')).not.toBeInTheDocument();
      });
    });

    it('should call onChange when date is selected', async () => {
      const handleChange = jest.fn();
      render(<DatePicker value={null} onChange={handleChange} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.click(input);
      
      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument();
      });
      
      // Find and click a date button (e.g., day 15)
      const dayButtons = screen.getAllByRole('button');
      const day15 = dayButtons.find(btn => btn.textContent === '15');
      
      if (day15) {
        fireEvent.click(day15);
        expect(handleChange).toHaveBeenCalled();
      }
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate with arrow keys', async () => {
      const user = userEvent.setup();
      render(<DatePicker value={null} onChange={() => {}} />);
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      
      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument();
      });
      
      // Test arrow key navigation
      await user.keyboard('{ArrowRight}');
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowLeft}');
      await user.keyboard('{ArrowUp}');
      
      // Calendar should still be open
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('should close calendar with Escape key', async () => {
      const user = userEvent.setup();
      render(<DatePicker value={null} onChange={() => {}} />);
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      
      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument();
      });
      
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByRole('grid')).not.toBeInTheDocument();
      });
    });

    it('should select date with Enter key', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      render(<DatePicker value={null} onChange={handleChange} />);
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      
      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument();
      });
      
      await user.keyboard('{Enter}');
      
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('Min/Max Date Constraints', () => {
    it('should disable dates before minDate', async () => {
      const minDate = new Date('2024-01-15');
      render(
        <DatePicker
          value={null}
          onChange={() => {}}
          minDate={minDate}
        />
      );
      
      const input = screen.getByRole('textbox');
      fireEvent.click(input);
      
      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument();
      });
      
      // Check if dates before minDate are disabled
      const dayButtons = screen.getAllByRole('button');
      const day10 = dayButtons.find(btn => btn.textContent === '10');
      
      if (day10) {
        expect(day10).toBeDisabled();
      }
    });

    it('should disable dates after maxDate', async () => {
      const maxDate = new Date('2024-01-20');
      render(
        <DatePicker
          value={null}
          onChange={() => {}}
          maxDate={maxDate}
        />
      );
      
      const input = screen.getByRole('textbox');
      fireEvent.click(input);
      
      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument();
      });
      
      // Check if dates after maxDate are disabled
      const dayButtons = screen.getAllByRole('button');
      const day25 = dayButtons.find(btn => btn.textContent === '25');
      
      if (day25) {
        expect(day25).toBeDisabled();
      }
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<DatePicker value={null} onChange={() => {}} disabled={true} />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('should not open calendar when disabled', () => {
      render(<DatePicker value={null} onChange={() => {}} disabled={true} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.click(input);
      
      expect(screen.queryByRole('grid')).not.toBeInTheDocument();
    });
  });

  describe('Time Selection', () => {
    it('should show time picker when showTime is true', async () => {
      render(<DatePicker value={null} onChange={() => {}} showTime={true} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.click(input);
      
      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument();
      });
      
      // Check for time selection elements
      expect(screen.getByText(/hour/i)).toBeInTheDocument();
      expect(screen.getByText(/minute/i)).toBeInTheDocument();
    });
  });

  describe('Language Support', () => {
    it('should display in English by default', () => {
      render(<DatePicker value={null} onChange={() => {}} language="en" />);
      const input = screen.getByRole('textbox');
      expect(input.placeholder).toContain('Select');
    });

    it('should display in Turkish when language is tr', () => {
      render(<DatePicker value={null} onChange={() => {}} language="tr" />);
      const input = screen.getByRole('textbox');
      expect(input.placeholder).toContain('Seç');
    });
  });

  describe('Date Formats', () => {
    it('should format date as DD/MM/YYYY', () => {
      const date = new Date('2024-01-15');
      render(
        <DatePicker
          value={date}
          onChange={() => {}}
          format="DD/MM/YYYY"
        />
      );
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('15/01/2024');
    });

    it('should format date as MM/DD/YYYY', () => {
      const date = new Date('2024-01-15');
      render(
        <DatePicker
          value={date}
          onChange={() => {}}
          format="MM/DD/YYYY"
        />
      );
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('01/15/2024');
    });

    it('should format date as YYYY-MM-DD', () => {
      const date = new Date('2024-01-15');
      render(
        <DatePicker
          value={date}
          onChange={() => {}}
          format="YYYY-MM-DD"
        />
      );
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('2024-01-15');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<DatePicker value={null} onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label');
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<DatePicker value={null} onChange={() => {}} />);
      
      const input = screen.getByRole('textbox');
      await user.tab();
      
      expect(input).toHaveFocus();
    });
  });
});
