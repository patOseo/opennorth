<div class="container my-5">
    <div class="cta-footer py-5 text-center" uk-scrollspy="cls: uk-animation-slide-bottom-medium; delay: 200; repeat: true">
        <p class="h2 mb-4"><?php echo get_field('cta_heading', 'option'); ?></p>
        <a class="btn btn-secondary" href="<?php echo esc_url(get_field('cta_button_link', 'option')); ?>"><?php echo get_field('cta_button_text', 'option'); ?></a>
    </div>
</div>