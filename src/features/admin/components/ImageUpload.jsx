import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlinePhoto,
  HiOutlineLink,
  HiOutlineXMark,
  HiOutlineCheckCircle,
} from 'react-icons/hi2';

const ImageUpload = ({ onImageSelect, currentImage = null }) => {
  const [activeTab, setActiveTab] = useState('url');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Initialize or update when currentImage changes
  useEffect(() => {
    if (currentImage && currentImage.length > 0 && currentImage !== 'default') {
      setPreview(currentImage);
      // Only set imageUrl if it's a URL, not base64
      if (currentImage.startsWith('http')) {
        setImageUrl(currentImage);
      } else {
        setImageUrl('');
      }
      setUploadedImage(null);
      setError(null);
    } else {
      setPreview(null);
      setImageUrl('');
      setUploadedImage(null);
      setError(null);
    }
  }, [currentImage]);

  // Handle changes when user types or pastes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeTab === 'url' && imageUrl.trim()) {
        handleUrlSubmit();
      }
    }, 800); // Wait for user to stop typing

    return () => clearTimeout(timer);
  }, [imageUrl, activeTab]);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Image = event.target?.result;
      setUploadedImage(base64Image);
      setPreview(base64Image);
      setImageUrl('');
      setError(null);
      onImageSelect(base64Image);
    };
    reader.onerror = () => {
      setError('Failed to read file');
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = (e) => {
    e?.preventDefault();
    
    if (!imageUrl.trim()) {
      setError(null);
      return;
    }

    // Clean URL (remove trailing spaces, etc)
    const cleanUrl = imageUrl.trim();

    // Basic URL format check
    try {
      new URL(cleanUrl);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    // Direct Image Link Validation
    setIsLoadingUrl(true);
    setPreview(null);
    setError(null);

    const img = new Image();
    img.onload = () => {
      setIsLoadingUrl(false);
      setPreview(cleanUrl);
      setUploadedImage(null);
      setError(null);
      onImageSelect(cleanUrl);
    };
    img.onerror = () => {
      setIsLoadingUrl(false);
      setError('Invalid Image: This link doesn\'t point to a direct image file or is blocked by CORS. (Try links from Unsplash, Imgur, or direct .jpg/.png links)');
      setPreview(null);
      onImageSelect(null);
    };
    img.src = cleanUrl;
  };

  const [isLoadingUrl, setIsLoadingUrl] = useState(false); // Changed name to avoid conflict


  const handleRemoveImage = () => {
    setPreview(null);
    setUploadedImage(null);
    setImageUrl('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageSelect(null);
  };

  const handleClearUrl = () => {
    setImageUrl('');
    setError(null);
  };

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleFileSelect({ target: { files: [file] } });
      } else {
        setError('Please drop a valid image file');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => {
            setActiveTab('url');
            handleClearUrl();
          }}
          className={`pb-3 px-4 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === 'url'
              ? 'border-emerald-500 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <HiOutlineLink className="inline mr-2" size={16} />
          Image URL
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`pb-3 px-4 font-semibold text-sm transition-colors border-b-2 ${
            activeTab === 'upload'
              ? 'border-emerald-500 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <HiOutlinePhoto className="inline mr-2" size={16} />
          Upload File
        </button>
      </div>

      {/* URL Tab */}
      {activeTab === 'url' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Image URL
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleUrlSubmit();
                      }
                    }}
                    className={`w-full pl-4 pr-10 py-2.5 border rounded-xl text-sm transition-all focus:outline-none focus:ring-4 ${
                      error 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10 bg-red-50/30' 
                        : preview && imageUrl.trim()
                          ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/10 bg-emerald-50/30'
                          : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10'
                    }`}
                  />
                  {isLoadingUrl && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  {preview && !error && imageUrl.trim() && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500">
                      <HiOutlineCheckCircle size={18} />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleUrlSubmit}
                  disabled={!imageUrl.trim() || isLoadingUrl}
                  className="px-6 py-2.5 bg-slate-900 text-white text-xs font-black uppercase italic tracking-widest rounded-xl hover:bg-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-lg shadow-slate-900/10"
                >
                  {isLoadingUrl ? 'Testing...' : 'Load Image'}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-2 px-1">
                Tip: Use direct links ending in .jpg, .png, or .webp
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-emerald-500 bg-emerald-50 scale-105'
                : 'border-slate-300 hover:border-emerald-500 hover:bg-emerald-50'
            }`}
          >
            <HiOutlinePhoto size={40} className="mx-auto mb-3 text-slate-400" />
            <p className="font-semibold text-slate-700 mb-1">
              {dragActive ? 'Drop image here' : 'Drag and drop your image here'}
            </p>
            <p className="text-sm text-slate-500 mb-4">
              or click to select from your device
            </p>
            <p className="text-xs text-slate-400">
              Supported formats: JPG, PNG, GIF, WebP (Max 5MB)
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2"
        >
          <HiOutlineXMark size={16} />
          {error}
        </motion.div>
      )}

      {/* Image Preview */}
      {preview && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <HiOutlineCheckCircle size={18} className="text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700">
              Image selected successfully
            </span>
          </div>
          <div className="relative group max-w-sm mx-auto">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-contain rounded-lg border border-slate-200 bg-slate-50"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <HiOutlineXMark size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ImageUpload;
