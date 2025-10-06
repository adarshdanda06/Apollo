# Apollo - Digital Audio Workstation with AI-Powered Source Segmentation

![Apollo Logo](https://img.shields.io/badge/Apollo-DAW-blue?style=for-the-badge&logo=music)
![Status](https://img.shields.io/badge/Status-Work%20in%20Progress-orange?style=for-the-badge)

## 🎵 Overview

Apollo is a next-generation Digital Audio Workstation (DAW) that combines traditional music production capabilities with cutting-edge AI technology for source separation and natural language audio editing. Built with modern web technologies and powered by state-of-the-art machine learning models, Apollo aims to revolutionize how musicians and producers create, edit, and master their music.

### 🚧 **Work in Progress**
This project is currently under active development. Features are being continuously added and improved. The current version provides a solid foundation for audio processing and source separation, with more advanced features planned for future releases.

## ✨ Key Features

### 🎛️ **Core DAW Functionality**
- **Infinite Track Support**: No limits on the number of tracks you can layer and mix
- **Real-time Audio Waveform Visualization**: Interactive waveform display for precise editing
- **Modern Web Interface**: Built with Next.js and React for optimal performance
- **Responsive Design**: Works seamlessly across desktop and mobile devices

### 🤖 **AI-Powered Source Separation**
- **Torch Demucs Integration**: Advanced UNet-style encoder-decoder model for high-quality source separation
- **Multiple Source Types**: Separate vocals, drums, bass, and other instruments from mixed audio
- **GPU Acceleration**: CUDA support for faster processing when available
- **RESTful API**: Flask-based backend for scalable audio processing

### 🎤 **Natural Language Audio Editing**
- **MusicGen Integration**: Single-state autoregressive transformer language model for text-to-audio generation
- **Intuitive Commands**: Edit your music using natural language descriptions
- **AI-Assisted Composition**: Generate new musical elements based on text prompts

### 🔐 **User Management**
- **Supabase Authentication**: Secure user registration and login
- **Project Management**: Save and organize your audio projects
- **Cloud Storage**: Persistent storage for your creative work

## 🏗️ Architecture

The project consists of two main components:

### Frontend (`/apollo/`)
A modern web application built with Next.js and React that provides the user interface for the digital audio workstation. Features include user authentication, audio file upload, waveform visualization, and project management.

### Backend (`/segmentationServer/`)
A Flask-based API server that handles audio processing using PyTorch and machine learning models. It provides source separation capabilities using the HDEMUCS model and supports natural language audio editing through MusicGen integration.

## 🎯 What Makes Apollo Special

Apollo stands out from traditional DAWs by integrating two powerful AI technologies:

1. **Source Separation**: Using Torch Demucs, a UNet-style encoder-decoder model that can intelligently separate different instruments and vocals from mixed audio tracks, allowing producers to isolate and work with individual elements.

2. **Natural Language Editing**: Through MusicGen, a transformer-based language model, users can describe what they want to change about their music in plain English, and the AI will help generate or modify audio accordingly.

This combination creates a unique workflow where musicians can not only separate existing audio into its component parts but also use natural language to create new musical elements and modify existing ones, making music production more intuitive and accessible.

## 🚀 Current Status

The project is actively being developed with core functionality already implemented:
- User authentication and project management
- Audio file upload and waveform visualization
- Source separation API backend
- Modern, responsive web interface

Future development will focus on expanding the natural language editing capabilities and adding more advanced DAW features.

---

**Note**: This project is a work in progress. Features and APIs may change as development continues. Stay tuned for updates and new features!
