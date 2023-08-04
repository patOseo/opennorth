<?php 
$columns = array('left', 'right');
$i = 1;
?>

<div class="rounded-5 expertise-panels-container px-lg-6 py-5" uk-scrollspy="cls: uk-animation-slide-bottom-medium; delay: 200">
    <div class="expertise-panels py-6 px-6" uk-scrollspy="target: .expertise-panel; cls: uk-animation-slide-bottom-medium; delay: 200">
        <p class="ff-inconsolata text-uppercase fw-bold text-white"><?php the_field('heading'); ?></p>
        <div class="row">
            <?php foreach($columns as $col): $panel = get_field($col . '_column'); ?>
                <div class="col-lg-6 mb-6 mb-lg-0">
                    <?php if($panel): ?>
                        <div class="expertise-panel text-white px-5 border-2 border-light border-start d-flex flex-column h-100" uk-scrollspy="target: svg; cls: uk-animation-stroke; delay: 200;">
                            <img class="mb-3" src="<?php echo get_stylesheet_directory_uri(); ?>/images/icon-expertise-<?= $i; ?>.svg" alt="Expertise Icon" width="128" height="128" uk-svg="stroke-animation: true">
                            <h2><?php echo $panel['heading']; ?></h2>
                            <?php echo $panel['text']; ?>
                            <?php if($panel['link']): ?>
                                <div class="d-block mt-auto"><a class="btn btn-primary btn-md px-3 py-2" href="<?= $panel['link']; ?>"><?php if(lang_en()) { echo 'Learn More'; } elseif(lang_fr()) { echo 'En savoir plus'; } ?></a></div>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                </div>
            <?php $i++; endforeach; ?>
        </div>
    </div>
</div>