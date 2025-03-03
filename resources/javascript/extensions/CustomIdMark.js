const { Mark } = Statamic.$bard.tiptap.core;

export const CustomIdMark = Mark.create({
  name: 'customId',

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: element => element.getAttribute('id'),
        renderHTML: attributes => {
          return attributes.id ? { id: attributes.id } : {};
        }
      }
    };
  },

  parseHTML() {
    return [{ tag: 'span[data-custom-id]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', { 'data-custom-id': HTMLAttributes.id }, 0];
  },

  addCommands() {
    return {
      setCustomId:
        (id) =>
          ({ chain }) => {
            return chain().setMark(this.name, { id }).run();
          },
      unsetCustomId:
        () =>
          ({ chain }) => {
            return chain().unsetMark(this.name).run();
          }
    };
  }
});
