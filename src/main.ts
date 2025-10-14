import QRCode from 'qrcode';

interface QRCodeOptions {
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  width: number;
  margin: number;
  color: {
    dark: string;
    light: string;
  };
}

class QRGenerator {
  private textInput: HTMLInputElement;
  private sizeSelect: HTMLSelectElement;
  private errorLevelSelect: HTMLSelectElement;
  private generateBtn: HTMLButtonElement;
  private resultDiv: HTMLDivElement;
  private qrCanvas: HTMLCanvasElement;
  private downloadBtn: HTMLAnchorElement;

  constructor() {
    this.textInput = document.getElementById('text-input') as HTMLInputElement;
    this.sizeSelect = document.getElementById('size-select') as HTMLSelectElement;
    this.errorLevelSelect = document.getElementById('error-level') as HTMLSelectElement;
    this.generateBtn = document.getElementById('generate-btn') as HTMLButtonElement;
    this.resultDiv = document.getElementById('result') as HTMLDivElement;
    this.qrCanvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
    this.downloadBtn = document.getElementById('download-btn') as HTMLAnchorElement;

    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    this.generateBtn.addEventListener('click', () => this.generateQRCode());
    this.textInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.generateQRCode();
      }
    });
  }

  private async generateQRCode(): Promise<void> {
    const text = this.textInput.value.trim();
    
    if (!text) {
      this.showError('Please enter some text or URL');
      return;
    }

    this.setLoading(true);

    try {
      const size = parseInt(this.sizeSelect.value);
      const errorLevel = this.errorLevelSelect.value as 'L' | 'M' | 'Q' | 'H';

      const options: QRCodeOptions = {
        errorCorrectionLevel: errorLevel,
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      };

      // Generate QR code to canvas
      await QRCode.toCanvas(this.qrCanvas, text, options);
      
      // Set up download functionality
      this.setupDownload(text, size);
      
      // Show result
      this.resultDiv.classList.add('show');
      this.resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

    } catch (error) {
      console.error('Error generating QR code:', error);
      this.showError('Failed to generate QR code. Please try again.');
    } finally {
      this.setLoading(false);
    }
  }

  private setupDownload(text: string, size: number): void {
    // Create a temporary canvas for download
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    
    if (!tempCtx) return;

    // Set canvas size with padding
    const padding = 40;
    tempCanvas.width = size + (padding * 2);
    tempCanvas.height = size + (padding * 2);

    // Fill background
    tempCtx.fillStyle = '#FFFFFF';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Draw QR code in center
    tempCtx.drawImage(this.qrCanvas, padding, padding, size, size);

    // Convert to blob and set download link
    tempCanvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        this.downloadBtn.href = url;
        this.downloadBtn.download = `qr-code-${this.sanitizeFilename(text)}.png`;
      }
    }, 'image/png');
  }

  private sanitizeFilename(text: string): string {
    return text
      .replace(/[^a-z0-9]/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50);
  }

  private setLoading(loading: boolean): void {
    this.generateBtn.disabled = loading;
    
    if (loading) {
      this.generateBtn.innerHTML = '<div class="loading"></div> Generating...';
    } else {
      this.generateBtn.innerHTML = 'Generate QR Code';
    }
  }

  private showError(message: string): void {
    // Create or update error message
    let errorDiv = document.getElementById('error-message');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.id = 'error-message';
      errorDiv.style.cssText = `
        background: #fee2e2;
        color: #dc2626;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        font-size: 0.875rem;
        border: 1px solid #fecaca;
      `;
      this.generateBtn.parentNode?.insertBefore(errorDiv, this.generateBtn);
    }
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Hide error after 5 seconds
    setTimeout(() => {
      errorDiv.style.display = 'none';
    }, 5000);
  }
}

// Initialize AdSense ads
function initializeAdSense(): void {
  try {
    // @ts-ignore - adsbygoogle is loaded from external script
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (error) {
    console.warn('AdSense initialization failed:', error);
  }
}

// Initialize the QR generator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new QRGenerator();
  
  // Initialize AdSense ads after a short delay to ensure the script is loaded
  setTimeout(() => {
    initializeAdSense();
  }, 1000);
});

// Add some utility functions for better UX
document.addEventListener('DOMContentLoaded', () => {
  // Auto-focus the input field
  const textInput = document.getElementById('text-input') as HTMLInputElement;
  textInput.focus();

  // Add example text on click if empty
  textInput.addEventListener('click', () => {
    if (!textInput.value) {
      textInput.placeholder = 'https://example.com or any text...';
    }
  });

  // Clear placeholder on focus
  textInput.addEventListener('focus', () => {
    textInput.placeholder = '';
  });

  // Restore placeholder on blur if empty
  textInput.addEventListener('blur', () => {
    if (!textInput.value) {
      textInput.placeholder = 'https://example.com or any text...';
    }
  });
});
