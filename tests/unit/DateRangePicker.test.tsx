import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DateRangePicker from '@/components/DateRangePicker';

describe('DateRangePicker Component', () => {
  describe('Basic Rendering', () => {
    it('should render without crashing', () => {
      render(
        <DateRangePicker
          startDate={null}
          endDate={null}
          onChange={() => {}}
        />
      );
      expect(screen.getAllByRole('textbox')).toHaveLength(2);
    });

    it('should display start and end date inputs', () => {
      render(
        <DateRangePicker
          startDate={null}
          endDate={null}
          onChange={() => {}}
        />
      );
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toBeInTheDocument(); // Start date
      expect(inputs[1]).toBeInTheDocument(); // End date
    });

    it('should display selected date range', () => {
      const startDate = new Date('2024-01-15');
      const endDate = new Date('2024-01-20');
      render(
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onChange={() => {}}
        />
      );
      
      const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
      expect(inputs[0].value).toContain('15');
      expect(inputs[1].value).toContain('20');
    });
  });

  describe('User Interactions', () => {
    it('should open calendar when start date input is clicked', async () => {
      render(
        <DateRangePicker
          startDate={null}
          endDate={null}
          onChange={() => {}}
        />
      );
      
      const inputs = screen.getAllByRole('textbox');
      fireEvent.click(inputs[0]);
      
      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument();
      });
    });

    it('should call onChange when date range is selected', async () => {
      const handleChange = jest.fn();
      render(
        <DateRangePicker
          startDate={null}
          endDate={null}
          onChange={handleChange}
        />
      );
      
      const inputs = screen.getAllByRole('textbox');
      fireEvent.click(inputs[0]);
      
      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument();
      });
      
      // Select start date
      const dayButtons = screen.getAllByRole('button');
      const day15 = dayButtons.find(btn => btn.textContent === '15');
      
      if (day15) {
        fireEvent.click(day15);
        expect(handleChange).toHaveBeenCalled();
      }
    });

    it('should not allow end date before start date', async () => {
      const startDate = new Date('2024-01-15');
      const handleChange = jest.fn();
      
      render(
        <DateRangePicker
          startDate={startDate}
          endDate={null}
          onChange={handleChange}
        />
      );
      
      const inputs = screen.getAllByRole('textbox');
      fireEvent.click(inputs[1]); // Click end date input
      
      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument();
      });
      
      // Try to select a date before start date (e.g., day 10)
      const dayButtons = screen.getAllByRole('button');
      const day10 = dayButtons.find(btn => btn.textContent === '10');
      
      if (day10) {
        expect(day10).toBeDisabled();
      }
    });
  });

  describe('Quick Select', () => {
    it('should show quick select options when enabled', async () => {
      render(
        <DateRangePicker
          startDate={null}
          endDate={null}
          onChange={() => {}}
          showQuickSelect={true}
        />
      );
      
      const inputs = screen.getAllByRole('textbox');
      fireEvent.click(inputs[0]);
      
      await waitFor(() => {
        expect(screen.getByText(/today/i)).toBeInTheDocument();
        expect(screen.getByText(/this week/i)).toBeInTheDocument();
      });
    });

    it('should select date range when quick option is clicked', async () => {
      const handleChange = jest.fn();
      render(
        <DateRangePicker
          startDate={null}
          endDate={null}
          onChange={handleChange}
          showQuickSelect={true}
        />
      );
      
      const inputs = screen.getAllByRole('textbox');
      fireEvent.click(inputs[0]);
      
      await waitFor(() => {
        expect(screen.getByText(/today/i)).toBeInTheDocument();
      });
      
      const todayButton = screen.getByText(/today/i);
      fireEvent.click(todayButton);
      
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('Two Month View', () => {
    it('should display two months side by side', async () => {
      render(
        <DateRangePicker
          startDate={null}
          endDate={null}
          onChange={() => {}}
        />
      );
      
      const inputs = screen.getAllByRole('textbox');
      fireEvent.click(inputs[0]);
      
      await waitFor(() => {
        const grids = screen.getAllByRole('grid');
        expect(grids.length).toBeGreaterThanOrEqual(2);
      });
    });
  });

  describe('Min/Max Date Constraints', () => {
    it('should respect minDate constraint', async () => {
      const minDate = new Date('2024-01-15');
      render(
        <DateRangePicker
          startDate={null}
          endDate={null}
          onChange={() => {}}
          minDate={minDate}
        />
      );
      
      const inputs = screen.getAllByRole('textbox');
      fireEvent.click(inputs[0]);
      
      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument();
      });
      
      const dayButtons = screen.getAllByRole('button');
      const day10 = dayButtons.find(btn => btn.textContent === '10');
      
      if (day10) {
        expect(day10).toBeDisabled();
      }
    });

    it('should respect maxDate constraint', async () => {
      const maxDate = new Date('2024-01-20');
      render(
        <DateRangePicker
          startDate={null}
          endDate={null}
          onChange={() => {}}
          maxDate={maxDate}
        />
      );
      
      const inputs = screen.getAllByRole('textbox');
      fireEvent.click(inputs[0]);
      
      await waitFor(() => {
        expect(screen.getByRole('grid')).toBeInTheDocument();
      });
      
      const dayButtons = screen.getAllByRole('button');
      const day25 = dayButtons.find(btn => btn.textContent === '25');
      
      if (day25) {
        expect(day25).toBeDisabled();
      }
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(
        <DateRangePicker
          startDate={null}
          endDate={null}
          onChange={() => {}}
          disabled={true}
        />
      );
      
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toBeDisabled();
      expect(inputs[1]).toBeDisabled();
    });

    it('should not open calendar when disabled', () => {
      render(
        <DateRangePicker
          startDate={null}
          endDate={null}
          onChange={() => {}}
          disabled={true}
        />
      );
      
      const inputs = screen.getAllByRole('textbox');
      fireEvent.click(inputs[0]);
      
      expect(screen.queryByRole('grid')).not.toBeInTheDocument();
    });
  });

  describe('Language Support', () => {
    it('should display in English by default', () => {
      render(
        <DateRangePicker
          startDate={null}
          endDate={null}
          onChange={() => {}}
          language="en"
        />
      );
      
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0].placeholder).toContain('Start');
      expect(inputs[1].placeholder).toContain('End');
    });

    it('should display in Turkish when language is tr', () => {
      render(
        <DateRangePicker
          startDate={null}
          endDate={null}
          onChange={() => {}}
          language="tr"
        />
      );
      
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0].placeholder).toContain('Başlangıç');
      expect(inputs[1].placeholder).toContain('Bitiş');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(
        <DateRangePicker
          startDate={null}
          endDate={null}
          onChange={() => {}}
        />
      );
      
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toHaveAttribute('aria-label');
      expect(inputs[1]).toHaveAttribute('aria-label');
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      render(
        <DateRangePicker
          startDate={null}
          endDate={null}
          onChange={() => {}}
        />
      );
      
      await user.tab();
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toHaveFocus();
      
      await user.tab();
      expect(inputs[1]).toHaveFocus();
    });
  });
});
