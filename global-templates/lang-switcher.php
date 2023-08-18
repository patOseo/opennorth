<?php $langs = array('en', 'fr'); ?>

<div class="lang-selector">
    <?php foreach($langs as $lang): ?>
        <?php
            $other_lang = null;
            
            if($lang == 'en') {
                $other_lang = 'fr';
            } elseif($lang == 'fr') {
                $other_lang = 'en';
            }
        ?>
        <div class="d-inline-block position-relative text-uppercase lang-btn lang-btn-<?= $lang; if($lang == ICL_LANGUAGE_CODE) { echo ' active'; } if($lang != ICL_LANGUAGE_CODE && transl_avail($lang) === false) { echo ' lang-btn-disabled'; } ?>">
            <?php if($lang != ICL_LANGUAGE_CODE && transl_avail($lang) === true): ?>
                <?php $translated_id = icl_object_id(get_the_ID(), 'post', false, $lang);  ?>
                <a class="text-primary text-decoration-none stretched-link" href="<?php echo apply_filters('wpml_permalink', get_permalink(), $lang); ?>" hreflang="<?= $lang; ?>"><?php echo $lang; ?></a>
            <?php else: ?>
                <?php echo $lang; ?>
            <?php endif; ?>
            
        </div>
    <?php endforeach; ?>
</div>