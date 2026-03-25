const MENU_FILE_ID = '1STItXugGFLlRoRHlxrEYCg7iN9w9wFoo' as const

/** 詳細メニュー（Google Drive 共有）— サイト内テキスト版メニューは持たずここへ誘導 */
export const MENU_DRIVE_URL =
  `https://drive.google.com/file/d/${MENU_FILE_ID}/view?usp=sharing` as const

/** iframe 埋め込み用（プレビュー） */
export const MENU_DRIVE_EMBED_URL =
  `https://drive.google.com/file/d/${MENU_FILE_ID}/preview` as const
