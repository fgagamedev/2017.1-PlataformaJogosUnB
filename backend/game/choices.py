from django.utils.translation import ugettext_lazy as _

EXTENSION_CHOICES = (
    ('deb', _('deb')),
    ('exe', _('exe')),
    ('rpm', _('rpm')),
    ('app', _('app')),
    ('sh', _('sh')),
)

ARCHITECTURE_CHOICES = (
    ('X86/32-bit', _('X86/32-bit')),
    ('AMD64/64-bit', _('AMD64/64-bit')),
)

KERNEL_CHOICES = (
    ('Linux', _('Linux')),
    ('Windows', _('Windows')),
    ('OSX', _('OSX')),
)
