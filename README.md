# AutoSave

This module saves the page via ajax when editing in the admin. The interval for saving the page is configurable in the AutoSave module settings.

- So far it seems to work fine for all fields and supports multilanguage.
- There's a message dialog show on top of page when saving happened with either a success or error.

## Requirements

ProcessWire 2.3+. Haven't really tested with 2.3.

## Known Issues

- Not recognizing required fields. The page gets saved no matter if filled or not. Not sure how to handle this at all, but well, it's a proof of concept.
- Note that when you have multiple editors editing pages, it would be possible 2 persons editing the same page would overwrite each other, since the page is autosaved! The only solution for this would be to have my  PageEditSoftLock module enabled with the complete "Lock" option active, so the page would be locked for editing.

## Todo

- Add some checks, if connection is lost.
- To be defined

This module is currently a proof of concept. This module may not be suitable for all instances, but for personal use it may help preventing loss of long edits, most likely blog posts. Not sure this should be used for regular sites with clients editing. Most likely there's some more issues that interferer with what a CMS "page save" has to deal with. So you might find some ugly stuff happening.

Thanks to Apeisa and his great Fredi font-end module, from where some logic is borrowed to save the page via ajax.