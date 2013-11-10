// Copyright (c) 2013 Marco Biasini
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

(function(exports) {

"use strict";

function FrameBuffer(gl, options) {
  this._width = options.width;
  this._height = options.height;
  console.log('frame buffer', this._width, this._height);
  this._gl = gl;
  this._colorHandle = this._gl.createFramebuffer();
  this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._colorHandle);
  this._depthHandle = this._gl.createRenderbuffer();
  this._gl.bindRenderbuffer(this._gl.RENDERBUFFER, this._depthHandle);
  this._gl.renderbufferStorage(this._gl.RENDERBUFFER, this._gl.DEPTH_COMPONENT16,
                               this._width, this._height);
  this._gl.framebufferRenderbuffer(this._gl.FRAMEBUFFER,
                                     this._gl.DEPTH_ATTACHMENT,
                                     this._gl.RENDERBUFFER, this._depthHandle);
  this._colorTexture = this._gl.createTexture();
  this._gl.bindTexture(this._gl.TEXTURE_2D, this._colorTexture);
  this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, this._width,
                      this._height, 0, this._gl.RGBA,
                      this._gl.UNSIGNED_BYTE, null);
  // create texture and use it for colors
  this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0,
                                this._gl.TEXTURE_2D, this._colorTexture, 0);
  this._gl.bindTexture(this._gl.TEXTURE_2D, null);
  this.release();
}

FrameBuffer.prototype.width = function() { return this._width; };
FrameBuffer.prototype.height = function() { return this._height; };

FrameBuffer.prototype.bind = function() {
  this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._colorHandle);
  this._gl.bindRenderbuffer(this._gl.RENDERBUFFER, this._depthHandle);
  this._gl.viewport(0, 0, this._width, this._height);
};

FrameBuffer.prototype.release = function() {
  this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, null);
  this._gl.bindRenderbuffer(this._gl.RENDERBUFFER, null);
};

exports.FrameBuffer = FrameBuffer;

})(this);

