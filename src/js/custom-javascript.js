jQuery(function($){
    // Mobile Menu Icon
    $('#navbarToggler').on('click', function() {
        $(this).toggleClass('open');
    });

    // Search Menu Icon
    $('#searchToggler').on('click', function(event) {
        event.preventDefault();
        $('#searchInput').toggleClass('d-xl-none');
        $('#searchIcon').toggleClass('col-xl-12');
    });

    // toTopButton
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#toTopButton').removeClass('hidden');
        } else {
            $('#toTopButton').addClass('hidden');
        }
    });

    // Smoothly scroll back to top when the button is clicked
    $('#toTopButton').click(function(event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // Enable linking to Bootstrap tabs
    window.addEventListener('load', function() {
        // Check if the URL contains a hash
        if (window.location.hash) {
          var targetTab = window.location.hash;
          $(targetTab + 'Tab').click();
            // Scroll to targetTab
            $('html, body').animate({
                scrollTop: $(targetTab + 'Tab').offset().top - 200
            }, 200);
        }
    });
    
    // Home Values – Insert svg inside .home-values
    $('.home-values').prepend('<img class="position-absolute d-none d-md-block top-50 start-50 translate-middle w-100 mw-100 mx-auto uk-animation-stroke" src="/wp-content/themes/opennorth/images/home-values.svg" uk-svg="stroke-animation: true"><img class="position-absolute d-block d-md-none top-50 start-50 translate-middle w-100 mw-100 mx-auto uk-animation-stroke" src="/wp-content/themes/opennorth/images/home-values-vertical.svg" uk-svg="stroke-animation: true">');

    // Links – insert svg inside .arrow-link
    $('.arrow-link a').append('<img class="ms-2" src="/wp-content/themes/opennorth/images/icon-arrow-link.svg">');

    // Scrollspy Elements
    $( window ).load(function() {
        $('.scroll-in').attr('uk-scrollspy', 'cls: uk-animation-slide-bottom-medium; delay: 200');
        $('.fade-in').attr('uk-scrollspy', 'cls: uk-animation-fade; delay: 200');
        $('.scroll-in-children').attr('uk-scrollspy', 'target: > div; cls: uk-animation-slide-bottom-small; delay: 200');
    });


    

    //////////////////////////
    //    Ajax Filtering    //
    //////////////////////////

    var filterTypes = ['rtype', 'subject', 'area'];
    
    // Loop through each filter type
    filterTypes.forEach((filterType) => {
        // When filterType is clicked
        $('#' + filterType + 'All').on('click', function() {
            if($('#' + filterType + 'All').prop('checked', true)) {
                // If already checked, prevent unchecking "all"
                $('#' + filterType + 'All').prop('checked', true);
            }
            // Uncheck all input with name filterType
            $('input[name="' + filterType + '"].subcheck').prop('checked', false);
        });
        // When any filterType subcheck is clicked
        $('input[name="' + filterType + '"].subcheck').on('click', function() {
            // Uncheck "All" input with name filterType
            if ($('input[name="' + filterType + '"].subcheck:not(:checked)').length === $('input[name="' + filterType + '"].subcheck').length) {
                $('#' + filterType + 'All').prop('checked', true);
            } else {
                $('#' + filterType + 'All').prop('checked', false);
            }

        });
    });

    // Filter Resources
    var currentPage = 1;
    function filterResources() {
        var selectedResourceType = $('input[name="rtype"]:checked').map(function(){
            return $(this).val();
        }).get();
        var selectedResourceSubject = $('input[name="subject"]:checked').map(function(){
            return $(this).val();
        }).get();
        var sortOrder = $('#sortResources').val();
        var searchResourceTerm = $('#resourceSearch').val();

        $.ajax({
            url: '/wp-admin/admin-ajax.php', // WordPress provides the 'ajaxurl' global variable
            type: 'POST',
            data: {
                action: 'filter_resources',
                page: currentPage,
                rtype: selectedResourceType,
                subject: selectedResourceSubject,
                search: searchResourceTerm,
                sort: sortOrder
            },
            beforeSend: function() {
                $('#filteredResources').html('<div class="my-6 py-6 text-center"><div class="my-lg-6 spinner-grow text-white text-center mx-auto" role="status"><span class="visually-hidden">Loading...</span></div></div>');
            },
            success: function(response) {
                $('#filteredResources').html(response);
            }
        });
    }

    function changeSortValue() {
        // If value of sortResources is "ASC", change to "DESC", and vice versa
        if($('#sortResources').val() === 'DESC') {
            $('#sortResources').val('ASC');
            // if html language is french
            if($('html').attr('lang') == 'en-CA') {
                $('#sortResources span').html('Oldest first');
            } else if($('html').attr('lang') == 'fr-CA'){
                $('#sortResources span').html('Les plus anciens en premier');
            }
        }
        else {
            $('#sortResources').val('DESC');
            if($('html').attr('lang') == 'en-CA') {
                $('#sortResources span').html('Newest first');
            } else if($('html').attr('lang') == 'fr-CA'){
                $('#sortResources span').html('Les plus récents en premier');
            }
        }
        $('#sortResources img').toggleClass('rotate-180');
        filterResources();
    }

    function filterCourses() {
        var selectedCourseType = $('input[name="area"]:checked').map(function(){
            return $(this).val();
        }).get();
        var searchCourseTerm = $('#courseSearch').val();


        $.ajax({
            url: '/wp-admin/admin-ajax.php', // WordPress provides the 'ajaxurl' global variable
            type: 'post',
            data: {
                action: 'filter_courses',
                page: currentPage,
                area: selectedCourseType,
                search: searchCourseTerm,
            },
            beforeSend: function() {
                $('#filteredCourses').html('<div class="my-6 py-6 text-center"><div class="my-lg-6 spinner-grow text-white text-center mx-auto" role="status"><span class="visually-hidden">Loading...</span></div></div>');
            },
            success: function(response) {
                $('#filteredCourses').html(response);
            }
        });
    }

    // Filter Resources
    $('#filterResources input[type="checkbox"').on('change', function(){currentPage = 1; filterResources()});
    $('#filterResources #resourceSearch').on('keydown', function(event){if(event.keyCode == 13){filterResources()}});
    $('#filterResources #buttonSearch').on('click', filterResources);
    $('#filterResources #sortResources').on('click', changeSortValue);
    // Pagination handling
    $(document).on('click', '.resources .pagination a', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        currentPage = $(this).attr('data-page'); // Update the page number from pagination links
        // Scroll to top of Resource list
        $('html, body').animate({
            scrollTop: $('#filteredResources').offset().top - 200
        }, 200);
        filterResources();
    });

    // Filter Courses
    $('#filterCourses input[type="checkbox"').on('change', function() { currentPage = 1; filterCourses()});
    $('#filterCourses #courseSearch').on('keydown', function(event){if(event.keyCode == 13){filterCourses()}});
    $('#filterCourses #buttonSearch').on('click', filterCourses);
    // Pagination handling
    $(document).on('click', '.courses-list .pagination a', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        currentPage = $(this).attr('data-page'); // Update the page number from pagination links
        // Scroll to top of Resource list
        $('html, body').animate({
            scrollTop: $('#filteredCourses').offset().top - 200
        }, 200);
        filterCourses();
    });

});