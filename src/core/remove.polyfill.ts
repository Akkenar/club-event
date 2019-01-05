(arr => {
  arr.forEach(item => {
    if (item.hasOwnProperty('remove')) {
      return;
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      value: function remove() {
        if (this.parentNode !== null) {
          this.parentNode.removeChild(this);
        }
      },
      writable: true,
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
