import { CustomIdMark } from "./extensions/CustomIdMark";

Statamic.$bard.addExtension(() => CustomIdMark);

Statamic.$bard.buttons((buttons, button) => {
  return button({
    name: 'custom_id',
    text: __('Add ID'),
    svg: 'tag', // Use the "tag" icon from Statamic's default icons
    command: (editor) => {
      const id = prompt("Enter ID for the selected text:");
      if (id) {
        editor.chain().focus().setCustomId(id).run();
      }
    },
    active: (editor) => editor.isActive('customId'),
  });
});
