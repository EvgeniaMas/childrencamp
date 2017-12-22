/*

	by LetMeCode.ru
	skype: letmecode.ru
	phone: +7 (938) 500-4-700

*/



jas.hook_set('ready', function() {
	jas.find('form').each(function() {
		var j = jas(this);
		if (j !== null) {
			j.hook_set('process_begin', function(t, s) {
				this.disable();
				var s = jas.set(this.element);
				s.find('.jas_form_submit').each(function() {
					this.style.display = 'none';
				});
				s.find('._t1').each(function() {
					this.style.display = 'inline-block';
					this.innerHTML = 'Подождите, идёт отправка';
				});
			})
			.hook_set('process_end', function(t, s) {
				jas.set(this.element).find('._t1').html('Успешно отправлено! Спасибо!');
			});
		}
	});
});
